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

// ── Farm ambient music ──────────────────────────────────────────────────────
// Stardew Valley style: G major, 96 BPM, 16-beat loop (~10s)
// Three layers: sine melody (flute), sine bass, triangle pad chords

let farmMusicGain = null
let farmMusicTimer = null
let farmMusicRunning = false

function scheduleFarmLoop(ctx, masterGain, startTime) {
  const beat = 60 / 96        // 0.625s per beat
  const loopLen = beat * 16   // 10s loop

  // G major notes
  const G3=196, B3=246.94, D4=293.66, G4=392, A4=440,
        B4=493.88, C5=523.25, D5=587.33, E5=659.25, G5=784,
        C3=130.81, E3=164.81, D3=146.83, Fs3=185, A3=220

  // Melody — 16 quarter notes, gentle flute-like
  const melody = [G4,B4,D5,G5, E5,D5,C5,B4, A4,B4,D5,A4, G4,B4,G4,0]
  melody.forEach((freq, i) => {
    if (!freq) return
    const t = startTime + i * beat
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.connect(g); g.connect(masterGain)
    osc.type = 'sine'
    osc.frequency.value = freq
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.12, t + 0.03)
    g.gain.exponentialRampToValueAtTime(0.001, t + beat * 0.8)
    osc.start(t); osc.stop(t + beat)
  })

  // Bass — one note per bar (4 beats)
  ;[G3, C3, D3, G3].forEach((freq, bar) => {
    const t = startTime + bar * beat * 4
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.connect(g); g.connect(masterGain)
    osc.type = 'sine'
    osc.frequency.value = freq
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.08, t + 0.06)
    g.gain.exponentialRampToValueAtTime(0.001, t + beat * 3.6)
    osc.start(t); osc.stop(t + beat * 4)
  })

  // Pad chords — triangle, very soft, held per bar
  const chords = [
    [G3,B3,D4], [C3,E3,G3], [D3,Fs3,A3], [G3,B3,D4],
  ]
  chords.forEach((chord, bar) => {
    const t = startTime + bar * beat * 4
    chord.forEach(freq => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.connect(g); g.connect(masterGain)
      osc.type = 'triangle'
      osc.frequency.value = freq
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.04, t + 0.18)
      g.gain.setValueAtTime(0.04, t + beat * 3.4)
      g.gain.exponentialRampToValueAtTime(0.001, t + beat * 4)
      osc.start(t); osc.stop(t + beat * 4)
    })
  })

  // Reschedule 0.6s before loop ends for seamless looping
  farmMusicTimer = setTimeout(() => {
    if (farmMusicRunning) scheduleFarmLoop(ctx, masterGain, startTime + loopLen)
  }, (loopLen - 0.6) * 1000)
}

export async function startFarmMusic() {
  if (farmMusicRunning) return
  farmMusicRunning = true
  try {
    const ctx = await getCtx()
    farmMusicGain = ctx.createGain()
    farmMusicGain.connect(ctx.destination)
    // Quick fade in (0.3s) so notes start at full volume
    farmMusicGain.gain.setValueAtTime(0, ctx.currentTime)
    farmMusicGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.3)
    scheduleFarmLoop(ctx, farmMusicGain, ctx.currentTime + 0.5)
  } catch {}
}

export function stopFarmMusic() {
  farmMusicRunning = false
  clearTimeout(farmMusicTimer)
  if (farmMusicGain && audioCtx) {
    try {
      const now = audioCtx.currentTime
      farmMusicGain.gain.cancelScheduledValues(now)
      farmMusicGain.gain.setValueAtTime(farmMusicGain.gain.value, now)
      farmMusicGain.gain.linearRampToValueAtTime(0, now + 1.5)
    } catch {}
    farmMusicGain = null
  }
}
