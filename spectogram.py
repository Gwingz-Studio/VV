import numpy as np
import matplotlib.pyplot as plt

# Parameters
freqs = np.linspace(10, 20, 256)  # Frequency in kHz
ca_values = np.linspace(0.2, 1.0, 100)  # Coherence-aesthetic index

# Meshgrid
CA, F = np.meshgrid(ca_values, freqs, indexing='ij')

# Define the resonance peak condition
resonance_freq = 16.2  # kHz
peak_height = 1.0
peak_width = 0.5  # kHz (FWHM)
baseline_amplitude = 0.2

# Linewidth depends on CA
def linewidth(ca):
    # Narrow at high CA, broad at low CA
    return 0.8 * (1 - ca) + 0.2  # ranges from 0.8 kHz to 0.2 kHz

# Build the spectrogram
amplitude = baseline_amplitude * np.ones_like(CA)
for i, ca in enumerate(ca_values):
    lw = linewidth(ca)
    # Gaussian for the resonance peak
    gauss = np.exp(-4 * np.log(2) * ((F - resonance_freq) ** 2) / (lw ** 2))
    peak = peak_height * gauss
    amplitude[i, :] += peak

# Mask to show only a slice for each CA (or keep as 2D)
# For plotting as CA vs frequency, we can take slices or show as an image

# Plot as an image: CA (y) vs Frequency (x)
plt.figure(figsize=(8, 5))
imshow = plt.imshow(amplitude.T, 
                    extent=[freqs.min(), freqs.max(), ca_values.min(), ca_values.max()],
                    origin='lower',
                    aspect='auto',
                    cmap='viridis',
                    vmin=0, vmax=1.2)
plt.colorbar(label='Microphononic Response Amplitude')
plt.xlabel('Frequency (kHz)')
plt.ylabel('Coherence-Aesthetic Index ($C_A$)')
plt.title('Frequency-resolved microphononic response of Slayton matter')
plt.axvline(x=resonance_freq, color='white', linestyle='--', label='Glamuron Resonance (16.2 kHz)')
plt.legend(loc='upper right')
plt.tight_layout()
plt.show()
