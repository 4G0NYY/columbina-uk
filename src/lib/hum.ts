/**
 * A soft, wordless hum — Columbina's signature — synthesized with the Web Audio
 * API so the site needs no bundled audio file. Must be triggered by a user
 * gesture (click / key press) to satisfy browser autoplay policies.
 *
 * Prefer a real recording? Drop it at `public/assets/secrets/humming.mp3` and
 * swap the body of playHum() for `new Audio("/assets/secrets/humming.mp3").play()`.
 */
let ctx: AudioContext | null = null;

export function playHum(): void {
  try {
    const AudioCtx =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    ctx = ctx ?? new AudioCtx();
    if (ctx.state === "suspended") void ctx.resume();

    const now = ctx.currentTime;
    // A quiet, drifting minor triad — three overlapping voices.
    const notes = [261.63, 311.13, 392.0]; // C4, Eb4, G4
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    // Gentle swell in and out over ~2.6s.
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.06, now + 0.6);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

    notes.forEach((freq, i) => {
      const osc = ctx!.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      // Slight detune shimmer.
      const voiceGain = ctx!.createGain();
      voiceGain.gain.value = i === 0 ? 1 : 0.6;
      osc.connect(voiceGain);
      voiceGain.connect(master);
      osc.start(now + i * 0.08);
      osc.stop(now + 2.8);
    });
  } catch {
    /* audio unavailable — silence is fine */
  }
}
