#include <cuda_runtime.h>
#include <cstdio>
__global__ void check(int* value) { *value = 42; }
int main() {
    int *device, value = 0;
    cudaError_t error = cudaMalloc(&device, sizeof(int));
    if (error == cudaSuccess) {
        check<<<1, 1>>>(device);
        error = cudaMemcpy(&value, device, sizeof(int), cudaMemcpyDeviceToHost);
        cudaFree(device);
    }
    if (error != cudaSuccess || value != 42) {
        std::fprintf(stderr, "CUDA preflight failed: %s; value=%d\n", cudaGetErrorString(error), value);
        return 1;
    }
    std::puts("CUDA kernel preflight passed");
    return 0;
}
