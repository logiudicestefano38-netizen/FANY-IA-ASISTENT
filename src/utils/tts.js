export const ensureAudioUnlocked = async () => {
  try {
    window._fanyAudioCtx = window._fanyAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (window._fanyAudioCtx.state === 'suspended') await window._fanyAudioCtx.resume();
    const osc = window._fanyAudioCtx.createOscillator(), gain = window._fanyAudioCtx.createGain();
    gain.gain.value = 0.0001; osc.connect(gain); gain.connect(window._fanyAudioCtx.destination);
    osc.start(); setTimeout(() => { try { osc.stop(); } catch {} }, 20);
  } catch {}
};

export const speak = async (text) => {
  await ensureAudioUnlocked();
  // Preserve a global reference to the saved voice command for debugging/UX (not spoken)
  try {
    window.fanyVoiceCommand = window.fanyVoiceCommand || localStorage.getItem("fanyVoiceCommand") || window.fanyVoiceCommand || "";
  } catch {}

  if (window.fanyVoiceId) {
    try {
      const result = await window.websim.textToSpeech({ text, voice: window.fanyVoiceId });
      const audio = new Audio(result.url);
      audio.playsInline = true;
      await audio.play().catch(() => {});
      return;
    } catch (e) {
      console.warn("TTS (custom voice) falló, usando síntesis local.", e);
    }
  }
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  // Prefer Spanish voices
  utter.lang = "es-ES";
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((v) =>
    /es-|Spanish|es_ES|es-ES/i.test(v.lang) && /female|woman|mónica|paloma|paulina/i.test(v.name)
  ) || voices.find((v) =>
    /es-|Spanish|es_ES|es-ES/i.test(v.lang)
  );
  if (preferred) utter.voice = preferred;
  // More natural, realistic tuning
  utter.rate = 0.95;
  utter.pitch = 1.05;
  utter.volume = 1.0;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
};