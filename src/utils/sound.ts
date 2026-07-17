/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Synthesizes a soft, localized parchment-turning sound effect using the Web Audio API.
 * This is fully self-contained, lightweight, and requires no external audio assets.
 */
export function playParchmentTurnSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    
    // Total duration of page turn in seconds
    const duration = 0.55; 
    const sampleRate = ctx.sampleRate;
    const bufferSize = sampleRate * duration;

    // --- LAYER 1: Soft friction sliding noise (parchment skin dragging) ---
    const slideBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const slideData = slideBuffer.getChannelData(0);
    let slideOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink-like filter to warm up the sound and reduce harshness
      slideData[i] = slideOut = 0.88 * slideOut + 0.12 * white;
    }

    const slideNode = ctx.createBufferSource();
    slideNode.buffer = slideBuffer;

    const slideBandpass = ctx.createBiquadFilter();
    slideBandpass.type = "bandpass";
    // Slide frequency sweep mimicking hand sliding across parchment
    slideBandpass.frequency.setValueAtTime(320, ctx.currentTime);
    slideBandpass.frequency.exponentialRampToValueAtTime(1050, ctx.currentTime + 0.18);
    slideBandpass.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + duration);
    slideBandpass.Q.setValueAtTime(1.3, ctx.currentTime);

    const slideLowpass = ctx.createBiquadFilter();
    slideLowpass.type = "lowpass";
    slideLowpass.frequency.setValueAtTime(1400, ctx.currentTime);
    slideLowpass.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + duration);

    const slideGain = ctx.createGain();
    slideGain.gain.setValueAtTime(0, ctx.currentTime);
    slideGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1); // soft volume swell
    slideGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    // --- LAYER 2: Subtle fibrous crinkles (folding heavy paper fibers) ---
    const crinkleBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const crinkleData = crinkleBuffer.getChannelData(0);
    let crinkleOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      crinkleData[i] = crinkleOut = 0.45 * crinkleOut + 0.55 * white;
    }

    const crinkleNode = ctx.createBufferSource();
    crinkleNode.buffer = crinkleBuffer;

    const crinkleHighpass = ctx.createBiquadFilter();
    crinkleHighpass.type = "highpass";
    crinkleHighpass.frequency.setValueAtTime(3800, ctx.currentTime);
    crinkleHighpass.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + duration);

    const crinkleGain = ctx.createGain();
    crinkleGain.gain.setValueAtTime(0, ctx.currentTime);
    crinkleGain.gain.linearRampToValueAtTime(0.012, ctx.currentTime + 0.08);
    crinkleGain.gain.linearRampToValueAtTime(0.022, ctx.currentTime + 0.18);
    
    // Simulate discrete rustle crackles by scheduling micro volume variations
    for (let t = 0.08; t < 0.38; t += 0.035) {
      crinkleGain.gain.setValueAtTime(0.008 + Math.random() * 0.018, ctx.currentTime + t);
    }
    crinkleGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    // --- SIGNAL CONNECTIONS ---
    slideNode.connect(slideBandpass);
    slideBandpass.connect(slideLowpass);
    slideLowpass.connect(slideGain);
    slideGain.connect(ctx.destination);

    crinkleNode.connect(crinkleHighpass);
    crinkleHighpass.connect(crinkleGain);
    crinkleGain.connect(ctx.destination);

    // --- TRIGGER ---
    slideNode.start();
    slideNode.stop(ctx.currentTime + duration);

    crinkleNode.start();
    crinkleNode.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn("Failed to play parchment page turn sound:", error);
  }
}
