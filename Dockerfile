# syntax=docker/dockerfile:1.7
FROM nvidia/cuda:13.2.0-devel-ubuntu24.04@sha256:f9492f2eea77fbc3d0c14fa8738f35946b42da72917bf5959d284ca39b4f209a AS llama-build
ARG LLAMA_COMMIT=29c720eaf72fcf8e4e61a56a88b994d92668261d
RUN apt-get update && apt-get install -y --no-install-recommends git cmake ninja-build g++ ca-certificates && rm -rf /var/lib/apt/lists/*
# Optional trust bundle for builds behind a TLS proxy; never copied into the image.
RUN --mount=type=secret,id=build_ca \
    if [ -f /run/secrets/build_ca ]; then export GIT_SSL_CAINFO=/run/secrets/build_ca; fi; \
    git init /src && cd /src && git remote add origin https://github.com/ggml-org/llama.cpp.git && git fetch --depth=1 origin "$LLAMA_COMMIT" && git checkout --detach FETCH_HEAD
# Build for MAX's Ada and Vast's Hopper, without depending on a build-host GPU.
RUN cmake -S /src -B /build -G Ninja -DGGML_CUDA=ON -DGGML_NATIVE=OFF -DCMAKE_CUDA_ARCHITECTURES="89;90" -DBUILD_SHARED_LIBS=OFF -DLLAMA_CURL=OFF -DLLAMA_BUILD_TESTS=OFF -DLLAMA_BUILD_EXAMPLES=OFF -DLLAMA_BUILD_SERVER=ON && cmake --build /build --target llama-server -j 4
COPY containers/forge/cuda-check.cu /tmp/cuda-check.cu
RUN nvcc -gencode arch=compute_89,code=sm_89 -gencode arch=compute_90,code=sm_90 /tmp/cuda-check.cu -o /build/bin/cuda-check

FROM nvidia/cuda:13.2.0-runtime-ubuntu24.04@sha256:7fada70c5ed1b85cb3c15b53f51300fdacff1c31466a20e4f2b29ad952fd63a2 AS python-build
RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-venv ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=ghcr.io/astral-sh/uv:0.12.19 /uv /usr/local/bin/uv
WORKDIR /app
COPY pyproject.toml uv.lock README.md ./
RUN --mount=type=cache,target=/root/.cache/uv uv sync --frozen --no-dev --extra forge --no-install-project --compile-bytecode
COPY vuorse_vortex/ ./vuorse_vortex/
RUN --mount=type=cache,target=/root/.cache/uv uv sync --frozen --no-dev --extra forge --no-editable --compile-bytecode
# Bake a small, checksum-verified GGUF for GPU retrieval using the same CUDA runtime.
RUN --mount=type=secret,id=build_ca .venv/bin/python -c "import hashlib,pathlib,ssl,urllib.request; p=pathlib.Path('/opt/embedding.gguf'); ca=pathlib.Path('/run/secrets/build_ca'); data=urllib.request.urlopen('https://huggingface.co/second-state/All-MiniLM-L6-v2-Embedding-GGUF/resolve/544f204f2eaa2d71361ffc74d6df7170285b286a/all-MiniLM-L6-v2-Q8_0.gguf', context=ssl.create_default_context(cafile=str(ca) if ca.exists() else None)).read(); assert hashlib.sha256(data).hexdigest() == '263215c3cadd6e16740741a7624ab4cbb6c8e777688bd5331ecfbf5681c2f8ed', 'embedding checksum mismatch'; p.write_bytes(data)"

FROM nvidia/cuda:13.2.0-runtime-ubuntu24.04@sha256:7fada70c5ed1b85cb3c15b53f51300fdacff1c31466a20e4f2b29ad952fd63a2 AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends python3 ca-certificates libgomp1 libstdc++6 && rm -rf /var/lib/apt/lists/* && useradd --uid 10001 --create-home forge && mkdir -p /data /input /models && chown forge:forge /data
COPY --from=llama-build /build/bin/llama-server /build/bin/cuda-check /opt/bin/
COPY --from=python-build /app/.venv /app/.venv
COPY --from=python-build /opt/embedding.gguf /opt/embedding.gguf
COPY containers/forge/entrypoint.py /opt/entrypoint.py
COPY uv.lock /opt/forge.lock
RUN sha256sum /opt/bin/llama-server /opt/entrypoint.py /opt/forge.lock > /opt/forge-runtime.sha256
ARG FORGE_REVISION=working-tree
ENV PATH=/app/.venv/bin:$PATH HOME=/home/forge ANONYMIZED_TELEMETRY=False CORTEX_REQUIRE_GPU=1 CORTEX_DEVICE=cuda NVIDIA_VISIBLE_DEVICES=all NVIDIA_DRIVER_CAPABILITIES=compute,utility FORGE_REVISION=$FORGE_REVISION MODEL_PATH=/models/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-Q4_K_P.gguf EMBEDDING_MODEL_PATH=/opt/embedding.gguf
LABEL org.opencontainers.image.title="VUORSE draft memory forge" org.opencontainers.image.revision=$FORGE_REVISION
WORKDIR /app
USER 10001:10001
HEALTHCHECK --interval=30s --timeout=5s --start-period=5700s CMD ["/app/.venv/bin/python", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8080/health', timeout=3)"]
ENTRYPOINT ["/app/.venv/bin/python", "/opt/entrypoint.py"]
CMD ["--cycles", "1000"]
