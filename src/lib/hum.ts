/**
 * Columbina's lullaby.
 *
 * Plays the official HoYoverse lullaby clip (public/assets/secrets/bina_lullaby.mp3);
 * if it can't load or autoplay is blocked, it falls back to a soft synthesized
 * hum via the Web Audio API. Must be triggered by a user gesture (click / key)
 * to satisfy browser autoplay policies.
 *
 * Audio © HoYoverse — used here as fan content; credited in the site footer.
 */
const LULLABY_SRC = "/assets/secrets/bina_lullaby.mp3";

let audio: HTMLAudioElement | null = null;
let ctx: AudioContext | null = null;

export function playHum(): void {
  try {
    if (!audio) {
      audio = new Audio(LULLABY_SRC);
      audio.volume = 0.65;
      audio.preload = "auto";
    }
    audio.currentTime = 0;
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => playSynthHum());
    }
  } catch {
    playSynthHum();
  }
}

/** Stop the lullaby if it's playing (e.g. when a secret effect ends). */
export function stopHum(): void {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

/** Fallback: a quiet, drifting minor triad synthesized in-browser. */
function playSynthHum(): void {
  try {
    const AudioCtx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    ctx = ctx ?? new AudioCtx();
    if (ctx.state === "suspended") void ctx.resume();

    const now = ctx.currentTime;
    const notes = [261.63, 311.13, 392.0]; // C4, Eb4, G4
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.06, now + 0.6);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

    notes.forEach((freq, i) => {
      const osc = ctx!.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
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
