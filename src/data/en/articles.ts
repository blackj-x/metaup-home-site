// English articles for the /en/ section of the mother site.
// These are original English content — not literal translations of the Chinese articles.
// They serve the same E-E-A-T goals but are written for English-speaking readers and may cover
// slightly different angles or phrasing to feel native.

export interface Article {
  slug: string;
  title: string;
  /** Card excerpt (short, ~1 sentence) */
  excerpt: string;
  /** Category / kicker */
  kicker: string;
  /** Publish/update date */
  date: string;
  /** Approx word count for internal tracking */
  words: number;
  /**
   * If this article has a direct counterpart in the other language,
   * set the slug of the alternate here. Only articles with this will get
   * cross-language hreflang.
   */
  alternateSlug?: string;
}

export const articles: Article[] = [
  {
    slug: 'how-we-build-reliable-guides',
    title: 'How We Build Reliable Game Guides: Data, Fact-Checking, and Hand-Drawn Maps',
    excerpt:
      'One wrong number can send an entire team to their deaths. This is exactly how MetaUp researches, verifies, and writes every guide — with transparent sourcing and original diagrams.',
    kicker: 'Our Process',
    date: '2026-06-24',
    words: 1350,
    alternateSlug: 'how-we-make-guides',
  },
  {
    slug: 'best-beginner-coop-games',
    title: 'Best Beginner Co-op Games That Won’t Make Your Friends Quit',
    excerpt:
      'Want to play with friends but worried about steep learning curves or toxic frustration? We ranked approachable co-op titles by onboarding difficulty, group size, and “fun failure” factor.',
    kicker: 'Recommendations',
    date: '2026-06-24',
    words: 1200,
    alternateSlug: 'coop-games-for-beginners',
  },
  {
    slug: 'how-to-spot-trustworthy-guides',
    title: 'How to Tell If a Game Guide Is Actually Trustworthy',
    excerpt:
      'The internet is full of outdated, copy-pasted guides. Here is a practical checklist any player can use in 30 seconds to decide whether a guide is worth following.',
    kicker: 'Player Guide',
    date: '2026-06-24',
    words: 1100,
    alternateSlug: 'spot-reliable-game-data',
  },
  {
    slug: 'co-op-communication-principles',
    title: 'Core Communication Principles That Work in Any Co-op Game',
    excerpt:
      'Most wipes aren’t about mechanics — they’re about miscommunication. These universal habits will make you a better teammate no matter which game you’re playing.',
    kicker: 'Teamwork',
    date: '2026-06-24',
    words: 980,
  },
  {
    slug: 'reading-game-patch-notes',
    title: 'How to Actually Read Game Patch Notes (Without Missing the Important Stuff)',
    excerpt:
      'Most players skim patch notes and still get surprised by changes. Here is a practical method to extract real value from every update.',
    kicker: 'Player Skills',
    date: '2026-06-24',
    words: 1050,
    alternateSlug: 'reading-patch-notes',
  },
  {
    slug: 'building-personal-knowledge-system',
    title: 'Building Your Own Game Knowledge System That Actually Lasts',
    excerpt:
      'Instead of relying on random guides forever, build a personal system for tracking what matters. Works for any game you play seriously.',
    kicker: 'Long-term Play',
    date: '2026-06-24',
    words: 920,
  },
  {
    slug: 'common-coop-mistakes',
    title: 'The Most Common Ways Co-op Teams Wipe (And How to Prevent Them)',
    excerpt:
      'Most wipes aren’t skill issues — they’re communication, judgment, or bad habits. Here are the patterns we see over and over.',
    kicker: 'Team Pitfalls',
    date: '2026-06-25',
    words: 1180,
    alternateSlug: 'common-coop-mistakes',
  },
  {
    slug: 'why-we-draw-maps',
    title: 'Why We Draw Our Own Maps Instead of Using Screenshots',
    excerpt:
      'Screenshots are easy. We still choose to draw clean SVG diagrams. This is why — copyright, clarity, and long-term value.',
    kicker: 'Our Approach',
    date: '2026-06-25',
    words: 950,
    alternateSlug: 'why-original-maps',
  },
  {
    slug: 'maintaining-game-guides',
    title: 'Maintaining Game Guides Over Time: Preventing Content Rot',
    excerpt:
      'Publishing a guide is only the beginning. Here is how we keep information accurate and useful months after launch.',
    kicker: 'Content Maintenance',
    date: '2026-06-25',
    words: 1050,
    alternateSlug: 'maintaining-game-guides',
  },
  {
    slug: '2026-coop-horror-watchlist',
    title: '2026 Co-op Horror Watchlist: Which Games Merit Dedicated Guide Stations',
    excerpt:
      'Cursed Companions, MIMESIS, The Mound plus Lethal Company as benchmark. Release status, mechanics depth, and whether each justifies its own station.',
    kicker: 'Trend Watch',
    date: '2026-07-21',
    words: 1590,
    alternateSlug: '2026-coop-horror-watchlist',
  },
  {
    slug: 'how-we-make-citable-guides',
    title: 'How We Make Game Guides That AI Search Engines Can Cite',
    excerpt:
      'LLMs and AI overviews reward verifiable sources, clean structure, and honest updates. Here is exactly how we design content for that reality.',
    kicker: 'Methodology',
    date: '2026-07-02',
    words: 1280,
    alternateSlug: 'ai-search-citable-guides',
  },
];
