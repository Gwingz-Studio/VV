<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:a5b96e9855c4f0c0618d6b2c192ac31b54730f3d75b8f70142f4856c1f84e297 -->

# VUORSE Qwen Forge

## What ships

One linux/amd64 image serves your GGUF with CUDA llama.cpp and runs a Python generation worker. Chroma retrieves vectors produced on GPU by a second, small llama.cpp server running MiniLM Q8 GGUF. Both inference services share the pinned CUDA build; this preserves `policies/gpu_runtime/README.md` without installing PyTorch. MiniLM inputs are clipped to 512 tokens; full memories stay in JSONL and Chroma. CUDA 13.2 runtime/devel stages, pinned llama.cpp commit and frozen uv dependencies replace the old startup installation chain. Build tools are excluded from the runtime. No image-size reduction percentage is claimed: this is a new CUDA image and has no baseline.

The generation loop samples an anchor, retrieves related draft memories, asks Qwen for a new hypothesis, writes and fsyncs a JSONL journal, and upserts into Chroma. All outputs are apocrypha with private visibility and disclosure/fact flags false. This implements the creator's requested cloud generation and unreviewed recursive feedback; it differs from the older local-drafting/accept-before-feedback workflow. It does not approve or promote records. Existing review and approved-data embedding commands remain available separately.

## MAX: build and run

Use Docker Desktop with Linux containers, WSL2 and NVIDIA GPU support. Run from the repository root in PowerShell. The Windows model directory is already the Compose default:

```powershell
$env:FORGE_REVISION = git rev-parse HEAD
docker compose build
docker compose run --rm forge --cycles 5 --output /data/smoke
```

The exact file expected is `Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-Q4_K_P.gguf`. Model and walled JSONL are mounted read-only; the image build context allowlist excludes all lore, model weights, credentials and quarantine. Output lives in the `forge-data` named volume. The initial context is 4096 with one inference slot. GPU inference speed, GGUF compatibility and memory use must be measured on MAX/Vast; this sandbox cannot establish them.

```powershell
docker compose run --rm forge --cycles 1000 --output /data/batch-001
# Same input/model/seed/image and output directory resumes toward 1000 total.
docker compose run --rm forge --cycles 1000 --output /data/batch-001
# Export the complete journal, provenance and Chroma state to a local directory.
New-Item -ItemType Directory -Force output/forge-export
docker compose run --rm --no-deps --entrypoint /bin/tar forge -C /data -czf /data/export.tgz batch-001
docker compose create forge
$id = docker compose ps -aq forge
docker cp "${id}:/data/export.tgz" output/forge-export/export.tgz
```

Use a fresh output directory for a changed input/model/seed/image. Do not run two workers against one output directory. A malformed model response stops the batch and leaves completed records resumable. A process failure after journaling but before Chroma upsert is repaired on restart. The final incomplete journal line is discarded. Run manifest binds input, generation model, embedding model and worker code SHA256, context settings, seed and image revision; lineage refers to immutable record IDs. Generation is stochastic and bit-for-bit model reproducibility across hardware is not promised.

## Buildx and registry

```powershell
$env:FORGE_IMAGE = 'YOUR_REGISTRY/YOUR_NAMESPACE/vuorse-forge:0.1.0'
docker login YOUR_REGISTRY
docker compose build
docker compose push
```

Alternatively use `docker buildx build --platform linux/amd64 --build-arg FORGE_REVISION=COMMIT --tag YOUR_IMAGE --push .`. For a TLS proxy, Buildx also accepts `--secret id=build_ca,src=/path/to/trusted-ca-bundle.pem`; the trust bundle is used during fetching and is not copied into the image.

Use a private registry, supply registry authentication through Vast, and record the published digest in the run notes. Dependencies install at build time, not instance startup. Updating llama.cpp or a base image is an explicit rebuild and smoke-test operation. The 25 MB MiniLM GGUF is baked in with its publisher revision and SHA256 pinned; the 17.9 GB Qwen GGUF is mounted or downloaded at runtime. Build CPU instructions are portable rather than native to the builder. GPU targets are Ada (89) and Hopper (90); rebuild with additional architectures for a different GPU family.

## Vast template

`containers/forge/vast-template.json` is a settings worksheet, not a claimed Vast API schema. In the Vast UI create a custom template with the worksheet image/tag, **Docker ENTRYPOINT / args** launch mode, and its arguments and environment. It is a batch container, without SSH, Jupyter or a public inference port. Preserve the image ENTRYPOINT. Do not use the old provisioner's onstart script: it reinstalls a different runtime.

Start with one H100 80 GB, verified host, reliability >0.99, North America and 500 GB disk. Use a driver-compatible host (the worksheet conservatively asks for CUDA >=13.2). The old cuda_max_good>=12.0 filter is unsuitable for this image. Driver compatibility is still a host requirement; startup executes an actual CUDA kernel before large asset downloads or generation. Preflight/model-server failure exits nonzero; it does not stop Vast billing.

Provide a durable volume at `/data`, writable by UID 10001, or explicitly prepare ownership before launch. Local instance storage is not a backup. The worksheet supplies the publisher's pinned model URL and SHA256. Your local model may differ: compare with `Get-FileHash -Algorithm SHA256` and use a matching URL/checksum for an exact copy. Supply your own HTTPS input JSONL URL and SHA256 or pre-stage it at `/input/debriefing_walled.jsonl`; URLs containing credentials belong only in instance secrets/settings. Nothing uploads automatically from MAX. Input must contain at least two valid MemoryRecord objects.

The container verifies downloaded assets before renaming them into place. Interrupted downloads restart; large completed files are reused. Both model servers have a shared ten-minute readiness deadline. Qwen thinking is disabled in requests to spend the token budget on the generated memory. Worker progress reports completed/target counts and elapsed seconds; errors appear in container logs. Run a five-record test first. Transfer the entire run directory through your chosen durable volume/cloud-copy workflow before destroying the instance. JSONL is authoritative and portable even if Chroma storage versions later change. Reconstruct Chroma using the same pinned image. Evaluation and promotion happen later on MAX.

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:d68f00eeaa41555c14c1662a108e97fead4f80baad02e98d818372b3be8b3545 -->

## Validation and limits

Run `uv run pytest`, `uv run ruff check vuorse_vortex tests containers/forge`, `uv run mypy vuorse_vortex`, `docker compose config --quiet`, then build. GPU preflight, model load, inference, throughput and Vast launch require an actual GPU/instance. There is no CPU fallback for embeddings or generation. A container packages CUDA userspace; the host still needs a compatible NVIDIA driver and container GPU passthrough. No paid launch or registry push is part of creating these files. This worker adds draft synthesis, not fine-tuning, automatic evaluation, visual inference or FastMTP sidecar support.

### Observed sandbox results (2026-11-02)

- Image built: `vuorse-forge:0.1.0`, local image ID `sha256:4178d0c858081c1fe780946e46f276a5eb71010228ea2201e80f91e10b1e11ea`, 2,865,017,432 bytes (2.87 GB). This is the Docker local image ID, not a registry manifest digest.
- The CUDA compilation stage took 1,318.2 seconds on four sandbox cores with 8 GiB RAM; the final rebuild reused it from cache. Full cold build wall time was not measured. Expect a substantial first source build; subsequent unchanged builds reuse the compiled stage.
- Core tests: 256 passed, 3 skipped. Targeted lint/type checks, Compose parsing, lock consistency and real Chroma integration passed. The final entrypoint-only adjustment was additionally checked by all nine forge tests.
- The image runs as UID/GID 10001 using Python 3.12.3. Real Chroma with simulated inference responses passed inside the image with a read-only root, dropped capabilities and writable temporary storage.
- Actual GGUF server startup was blocked by the absent host NVIDIA driver library `libcuda.so.1`. Other linked runtime libraries resolve. The driver library comes from NVIDIA GPU container passthrough, rather than this CUDA userspace image. Actual model loading, embeddings, generation and speed remain unverified until the five-record GPU smoke test.


<!-- /coderabbit-ai-generated:v1 -->

## Pinned upstream sources

- [llama.cpp server API](https://github.com/ggml-org/llama.cpp/blob/29c720eaf72fcf8e4e61a56a88b994d92668261d/tools/server/README.md)
- [MiniLM GGUF files](https://huggingface.co/second-state/All-MiniLM-L6-v2-Embedding-GGUF/tree/544f204f2eaa2d71361ffc74d6df7170285b286a)
- [Qwen GGUF files](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF/tree/993a5971fda8f30dd1b7eb2654792ba4415c7460)


<!-- /coderabbit-ai-generated:v1 -->