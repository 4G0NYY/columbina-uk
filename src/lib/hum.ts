/**
 * Columbina's lullaby.
 *
 * Plays the official HoYoverse lullaby clip (public/assets/secrets/bina_lullaby.mp3);
 * if it can't load or autoplay is blocked, it falls back to a soft synthesized
 * hum via the Web Audio API. Must be triggered by a user gesture (click / key)
 * to satisfy browser autoplay policies.
 *
 * Both paths are routed through a shared AnalyserNode, so a visualizer can read
 * the live signal via getHumAnalyser(). If Web Audio is unavailable the lullaby
 * still plays; the analyser is simply null.
 *
 * Audio © HoYoverse, used here as fan content; credited in the site footer.
 */
const LULLABY_SRC = "/assets/secrets/bina_lullaby.mp3";

let audio: HTMLAudioElement | null = null;
let ctx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let mediaWired = false;

/** Lazily build the shared context + analyser (analyser → destination). */
function ensureGraph(): AudioContext | null {
  if (ctx) return ctx;
  try {
    const AudioCtx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
    analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.82;
    analyser.connect(ctx.destination);
    return ctx;
  } catch {
    return null;
  }
}

/** The live analyser for a visualizer, or null if Web Audio is unavailable. */
export function getHumAnalyser(): AnalyserNode | null {
  return analyser;
}

export function playHum(): void {
  try {
    if (!audio) {
      audio = new Audio(LULLABY_SRC);
      audio.volume = 0.65;
      audio.preload = "auto";
    }

    // Route the element through the analyser once (best-effort).
    const graph = ensureGraph();
    if (graph && analyser && !mediaWired) {
      try {
        const source = graph.createMediaElementSource(audio);
        source.connect(analyser);
        mediaWired = true;
      } catch {
        // Element could not be wired; it will still play to the speakers.
      }
    }
    if (graph && graph.state === "suspended") void graph.resume();

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
    const graph = ensureGraph();
    if (!graph) return;
    if (graph.state === "suspended") void graph.resume();

    const now = graph.currentTime;
    const notes = [261.63, 311.13, 392.0]; // C4, Eb4, G4
    const master = graph.createGain();
    master.gain.value = 0.0001;
    // Feed the analyser (which reaches the destination) so the synth is visualized too.
    master.connect(analyser ?? graph.destination);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.06, now + 0.6);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

    notes.forEach((freq, i) => {
      const osc = graph.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const voiceGain = graph.createGain();
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
