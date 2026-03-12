let audioCtx = null

async function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume()
  }
  return audioCtx
}

function note(ctx, freq, type, volume, startTime, duration) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
  osc.start(startTime)
  osc.stop(startTime + duration)
}

// Session complete — rising C major arpeggio
export async function playSessionComplete() {
  try {
    const ctx = await getCtx()
    ;[523.25, 659.25, 783.99].forEach((freq, i) => {
      note(ctx, freq, 'sine', 0.18, ctx.currentTime + i * 0.18, 0.6)
    })
  } catch {}
}

// Plant seed — soft ascending pop
export function playPlantSound() {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(320, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(580, ctx.currentTime + 0.12)
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.25)
  } catch {}
}

// Harvest — bright triangle arpeggio
export function playHarvestSound() {
  try {
    const ctx = getCtx()
    ;[659.25, 783.99, 1046.5].forEach((freq, i) => {
      note(ctx, freq, 'triangle', 0.15, ctx.currentTime + i * 0.12, 0.5)
    })
  } catch {}
}

// Buy seed — coin clink: two quick high tones
export function playBuySound() {
  try {
    const ctx = getCtx()
    ;[1200, 1500].forEach((freq, i) => {
      note(ctx, freq, 'triangle', 0.1, ctx.currentTime + i * 0.1, 0.2)
    })
  } catch {}
}

// Timer start — two quick ascending tones
export async function playTimerStart() {
  try {
    const ctx = await getCtx()
    ;[440, 660].forEach((freq, i) => {
      note(ctx, freq, 'sine', 0.2, ctx.currentTime + i * 0.12, 0.25)
    })
  } catch {}
}

// Timer pause — two quick descending tones
export async function playTimerPause() {
  try {
    const ctx = await getCtx()
    ;[660, 440].forEach((freq, i) => {
      note(ctx, freq, 'sine', 0.2, ctx.currentTime + i * 0.12, 0.25)
    })
  } catch {}
}

// Timer reset — short neutral double-tap
export function playTimerReset() {
  try {
    const ctx = getCtx()
    ;[330, 330].forEach((freq, i) => {
      note(ctx, freq, 'sine', 0.08, ctx.currentTime + i * 0.1, 0.15)
    })
  } catch {}
}

// Tab navigation — light tap
export function playNavClick() {
  try {
    const ctx = getCtx()
    note(ctx, 800, 'sine', 0.06, ctx.currentTime, 0.1)
  } catch {}
}

// Tile select — soft low thud
export function playTileSelect() {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(180, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  } catch {}
}

// Morning collect — warm ascending three-note reward
export function playMorningCollect() {
  try {
    const ctx = getCtx()
    ;[392, 523.25, 659.25].forEach((freq, i) => {
      note(ctx, freq, 'sine', 0.14, ctx.currentTime + i * 0.15, 0.5)
    })
  } catch {}
}

// World select — soft whoosh + landing tone
export function playWorldSelect() {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(300, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.25)
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.4)

    // Landing tone
    note(ctx, 523.25, 'sine', 0.08, ctx.currentTime + 0.28, 0.4)
  } catch {}
}
