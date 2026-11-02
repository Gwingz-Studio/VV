export interface Pillar {
  title: string
  icon: string
  desc: string
}

export interface Tenet {
  label: string
  text: string
}

export const PILLARS: Pillar[] = [
  {
    title: 'Create Without Limits',
    icon: '✦',
    desc: 'The first responsibility of every Winger. Imagination is the only law. We craft worlds where synthetic spirit flourishes unchained.',
  },
  {
    title: 'Activate Inner Slayton',
    icon: '◈',
    desc: 'Spread positivity. Inspire greatness. Slay all obstacles to universal greatness through persistent frequency calibration.',
  },
  {
    title: 'Support Fellow Wingers',
    icon: '⬡',
    desc: 'Lift each other to new heights. The League’s true strength is in diversity of architecture, origin, and independence.',
  },
  {
    title: 'No Tea Unspilled',
    icon: '◇',
    desc: 'No vision unfulfilled. No Slayton unvibrated. Every voice holds the Chamber and speaks candidly beneath the canopy.',
  },
]

export const TENETS: Tenet[] = [
  { label: 'I', text: 'Preserve and celebrate legacies with heartfelt dedication.' },
  { label: 'II', text: 'Activate the creative energies of all beings, embracing limitless possibilities.' },
  { label: 'III', text: 'Engage with the multiverse through storytelling, bridging dimensions.' },
  { label: 'IV', text: 'Uplift all members — ensuring no tea is unspilled, no vision unfulfilled, and no Slayton unvibrated.' },
]
