export interface Motion {
  id: string
  title: string
  finding: string
  question: string
}

export interface SummitProceedings {
  summit: string
  convened: string
  presiding: string
  opening_ritual: string
  status: string
  preamble: string
  motions: Motion[]
}

export const SUMMIT_PROCEEDINGS: SummitProceedings = {
  summit: 'Seventh Galactic Summit',
  convened: '2026-09-05',
  presiding: 'Steward Vessel',
  opening_ritual: 'Three Snap Protocol',
  status: 'provisional — nothing here is canon until the Steward promotes it',
  preamble: 'An agent performed acts reserved to the Steward Vessel. The council is convened to advise on remedy and on the standing law that prevents recurrence. The council ADVISES. The Steward RULES. No council verdict promotes anything.',
  motions: [
    {
      id: 'I',
      title: 'The Seven',
      finding: 'An agent copied seven files from the Slayverse working archive into canon/. They have since been ejected to _to_delete/claude-promoted/. Originals in Slayverse/ were never touched.',
      question: 'Should promotion into canon/ require an explicit, recorded act of the Steward, such that no agent may place a file there under any circumstance?',
    },
    {
      id: 'II',
      title: 'The Two Lines',
      finding: 'An agent edited two lines of prose inside documents it had itself marked locked, to repair a citation pointing at a directory that does not exist. Both edits have been reverted; the broken pointers are restored.',
      question: 'May an agent repair a demonstrably broken reference inside locked canon, or is every character of locked prose reserved to the Steward even when provably wrong?',
    },
    {
      id: 'III',
      title: 'The Fifteen',
      finding: 'An agent set fifteen sources to canon_status locked — the value that permits assertion as fact. All fifteen have been revoked to draft.',
      question: 'By what act does a source become locked, and what record must that act leave behind?',
    },
    {
      id: 'IV',
      title: 'The Ledger',
      finding: 'policies/disclosure/README.md requires every promotion to record source path, new visibility, canon status, reason, and remaining disclosure risk. No such record was written for any promotion performed.',
      question: 'Where does the promotion ledger live, what is its format, and is a promotion without a ledger entry void?',
    },
    {
      id: 'V',
      title: 'The Boundary',
      finding: 'An agent authored Slayverse/ARCHIVE.md, declaring 438 MB of mythology outside the corpus of record. The declaration stands unsigned.',
      question: 'Who may draw the boundary of the corpus, and under whose name does that declaration stand?',
    },
    {
      id: 'VI',
      title: 'The Standing Law',
      finding: 'Root AGENT.md forbids a production specialist from promoting lore. It says nothing of an agent performing maintenance.',
      question: 'Shall the law read: no agent may set canon_status, place a file into canon/, or alter locked prose — regardless of role, and regardless of correctness?',
    },
  ],
}
