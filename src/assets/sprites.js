// Pixel art sprite data — 12x12 character grids
// Each character maps to a color in PALETTE. '.' = transparent.

export const PALETTE = {
  '.': null,
  'd': '#2a1505',  // dark outline
  's': '#5c3a1e',  // seed brown
  'S': '#7a5230',  // light seed
  'g': '#1e5c12',  // dark green
  'G': '#4a9c1e',  // green
  'l': '#7acc34',  // light green
  'b': '#4a2808',  // dark stem
  'B': '#8a5a14',  // stem brown
  'r': '#8c1818',  // dark red
  'R': '#d42020',  // tomato red
  'y': '#b88010',  // dark yellow
  'Y': '#f0c020',  // corn yellow
  'P': '#c08040',  // potato tan
  'p': '#7a4a20',  // dark potato
  'C': '#38b030',  // cabbage green
  'c': '#186010',  // dark cabbage
}

const seed = [
  '............',
  '............',
  '....dddd....',
  '...d....d...',
  '...d.ss.d...',
  '...d.Ss.d...',
  '...d.ss.d...',
  '...d....d...',
  '....dddd....',
  '............',
  '............',
  '............',
]

const sprout = [
  '............',
  '.....l......',
  '....lGl.....',
  '.....G......',
  '.....B......',
  '.....B......',
  '....BBB.....',
  '...bBBBb....',
  '............',
  '............',
  '............',
  '............',
]

const tomatoPlant = [
  '..l...l.....',
  '.lGl.lGl....',
  '..lGGGl.....',
  '...lGl......',
  '....B.......',
  '....B.......',
  '....B.......',
  '...BBB......',
  '..bBBBb.....',
  '............',
  '............',
  '............',
]

const tomatoHarvest = [
  '..l..l......',
  '.lGllGl.....',
  '..lRrl......',
  '..RrRR......',
  '.RrrrrR.....',
  '..RrrR......',
  '....B.......',
  '...BBB......',
  '..bBBBb.....',
  '............',
  '............',
  '............',
]

const cornSmall = [
  '............',
  '.....l......',
  '....lGl.....',
  '....lGl.....',
  '....lGl.....',
  '.....B......',
  '.....B......',
  '....BBB.....',
  '...bBBBb....',
  '............',
  '............',
  '............',
]

const cornTall = [
  '......l.....',
  '.....lGl....',
  '....lGGl....',
  '...lGGGl....',
  '....lGGl....',
  '.l..lGGl....',
  'lGl..GGl....',
  '.lGl.GG.....',
  '..lG.BB.....',
  '.....BB.....',
  '....BBB.....',
  '...bBBBb....',
]

const cornHarvest = [
  '....lYl.....',
  '...lYYYl....',
  '..lGYYYGl...',
  '...lYYYl....',
  '....lYl.....',
  '.....B......',
  '.....B......',
  '....BBB.....',
  '...bBBBb....',
  '............',
  '............',
  '............',
]

const potatoLeaves = [
  '............',
  '...l..l.....',
  '..lGl.lG....',
  '..lGllGl....',
  '...lGGl.....',
  '....lG......',
  '.....B......',
  '....BBB.....',
  '...bBBBb....',
  '............',
  '............',
  '............',
]

const potatoMature = [
  '..l...l.....',
  '.lGl.lGl....',
  '..lGGGl.....',
  '...lGl......',
  '....B.......',
  '....Bp......',
  '...bPPp.....',
  '...pPPp.....',
  '....pp......',
  '............',
  '............',
  '............',
]

const potatoHarvest = [
  '.l...l......',
  'lGl.lGl.....',
  '.lGGGl......',
  '..lGl.......',
  '...Bp.......',
  '..bPPPp.....',
  '.bPPPPPb....',
  '..pPPPp.....',
  '...ppp......',
  '............',
  '............',
  '............',
]

const cabbageForming = [
  '............',
  '....cCc.....',
  '...cCCCc....',
  '..cCCCCc....',
  '...cCCCc....',
  '....cCc.....',
  '.....B......',
  '....BBB.....',
  '...bBBBb....',
  '............',
  '............',
  '............',
]

const cabbageHarvest = [
  '....cCc.....',
  '...cCCCc....',
  '..cCCCCCc...',
  '.cCCCCCCCc..',
  '..cCCCCCc...',
  '...cCCCc....',
  '....cCc.....',
  '.....B......',
  '....BBB.....',
  '...bBBBb....',
  '............',
  '............',
]

export const CROP_SPRITES = {
  tomato:  [seed, sprout,       tomatoPlant,    tomatoHarvest],
  corn:    [seed, cornSmall,    cornTall,        cornHarvest],
  potato:  [seed, potatoLeaves, potatoMature,   potatoHarvest],
  cabbage: [seed, sprout,       cabbageForming, cabbageHarvest],
}
