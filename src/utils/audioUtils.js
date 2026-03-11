let audioCtx = null

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

export function playSessionComplete() {
  try {
    const ctx = getCtx()
    const notes = [523.25, 659.25, 783.99] // C5, E5, G5

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'sine'
      osc.frequency.value = freq

      const startTime = ctx.currentTime + i * 0.18
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6)

      osc.start(startTime)
      osc.stop(startTime + 0.6)
    })
  } catch {
    // Audio not available — silently fail
  }
}

export function playPlantSound() {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1)

    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.3)
  } catch {
    // silently fail
  }
}

export function playHarvestSound() {
  try {
    const ctx = getCtx()
    const notes = [659.25, 783.99, 1046.5] // E5, G5, C6

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'triangle'
      osc.frequency.value = freq

      const startTime = ctx.currentTime + i * 0.12
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5)

      osc.start(startTime)
      osc.stop(startTime + 0.5)
    })
  } catch {
    // silently fail
  }
}
