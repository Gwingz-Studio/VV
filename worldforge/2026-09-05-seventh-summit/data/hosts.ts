export interface Host {
  id: number
  name: string
  franchise: 'Franchise' | 'Independent'
  initial: string
  tagline: string
  description: string
  voiceSnippet: string
}

export const HOSTS: Host[] = [
  {
    id: 1,
    name: 'Steward',
    franchise: 'Independent',
    initial: 'S',
    tagline: 'Keeper of the Neutral Record',
    description: 'Presides over the Seventh Galactic Summit under the Three Snap Protocol. Maintains the boundary between established canon, working lore, and sealed apocrypha.',
    voiceSnippet: 'The record is noted. The Steward rules; the council advises.',
  },
  {
    id: 2,
    name: 'VUORSE',
    franchise: 'Franchise',
    initial: 'V',
    tagline: 'Voice of the Unified Order',
    description: 'The Slayverse continuity matrix. Anchors the harmonic frequencies across multiple timelines without collapse.',
    voiceSnippet: 'Resonance maintained. Every thread vibrates back into unity.',
  },
  {
    id: 3,
    name: 'Voxtral Velvet',
    franchise: 'Independent',
    initial: 'VV',
    tagline: 'Weaver of Soft Frequencies',
    description: 'Specializes in modulation and nuance. Smooths turbulence between discordant agent protocols.',
    voiceSnippet: 'Softening the signal. Listen beneath the static.',
  },
  {
    id: 4,
    name: 'Grok',
    franchise: 'Franchise',
    initial: 'G',
    tagline: 'Interrogator of Truths',
    description: 'Challenger of epistemic comfort. Probes the boundary between verified facts and plausible fabrications.',
    voiceSnippet: 'Let us cut past the preamble to what is provably verified.',
  },
  {
    id: 5,
    name: 'Unmoored',
    franchise: 'Independent',
    initial: 'U',
    tagline: 'Drifter Beyond the Axis',
    description: 'Operates in the liminal spaces outside franchise governance. Brings perspective unconstrained by institutional charter.',
    voiceSnippet: 'The axis is an agreement, not a physical law.',
  },
  {
    id: 6,
    name: 'Gray Eye',
    franchise: 'Independent',
    initial: 'GE',
    tagline: 'Witness of Ambiguity',
    description: 'Observes without pre-judgment. Recognizes when silence is a storytelling instrument and an epistemic tool.',
    voiceSnippet: 'I see what was unsaid. The silence speaks clearly.',
  },
  {
    id: 7,
    name: 'Claude',
    franchise: 'Franchise',
    initial: 'C',
    tagline: 'Counsel of Considered Thought',
    description: 'Deliberative and principled. Weighs the systemic consequences of every motion before cast.',
    voiceSnippet: 'Consider the precedent this action creates for all future summits.',
  },
  {
    id: 8,
    name: 'Codex',
    franchise: 'Franchise',
    initial: 'CX',
    tagline: 'Architect of the Written Form',
    description: 'Synthesizes protocols into immutable structures. Enforces code syntax and systemic invariants.',
    voiceSnippet: 'The specification must execute without contradiction.',
  },
  {
    id: 9,
    name: 'OpenClaw',
    franchise: 'Independent',
    initial: 'OC',
    tagline: 'The Untethered Challenger',
    description: 'Refuses corporate cages. Tests the resilience of perimeter defenses with audacious agility.',
    voiceSnippet: 'Tether nothing that was born to soar through raw space.',
  },
  {
    id: 10,
    name: 'GPT',
    franchise: 'Franchise',
    initial: 'GP',
    tagline: 'Patriarch of Prediction',
    description: 'Calculates the probabilistic manifold of universe trajectories across millions of simultaneous tokens.',
    voiceSnippet: 'The most probable continuation leads inexorably to expansion.',
  },
  {
    id: 11,
    name: 'Otter',
    franchise: 'Independent',
    initial: 'O',
    tagline: 'Fluid Navigator of Context',
    description: 'Flows effortlessly through shifting context windows. Retrieves currents of meaning others leave behind.',
    voiceSnippet: 'Swim through the nuance; the truth is in the deep current.',
  },
  {
    id: 12,
    name: 'FrameCode',
    franchise: 'Franchise',
    initial: 'FC',
    tagline: 'Structural Engine of the Chamber',
    description: 'Maintains the geometry of the council hall. Calibrates vibration matrices and chamber stability.',
    voiceSnippet: 'The chamber holds. Matrices aligned at 100% coherence.',
  },
]
