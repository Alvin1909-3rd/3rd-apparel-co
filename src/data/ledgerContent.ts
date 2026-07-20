export interface LedgerModule {
  id: string;
  code: string;
  title: string;
  readTime: string;
  color: string;
  body: string[];
  takeaway: string;
  quote: string | null;
  chips: string[];
  redFlag: string | null;
}

export const MODULES: LedgerModule[] = [
  {
    id: '01', code: 'INTRO', title: 'What crypto actually is', readTime: '3 min', color: '#F7931A',
    body: [
      "I came up without a financial safety net, so I was skeptical from day one — I'd seen enough people get burned to keep my guard up. But once I got in, the potential was clear as day.",
      "Crypto is digital money that runs on a blockchain — a shared, tamper-proof ledger where every transaction is recorded across thousands of computers at once. No middleman, no bank. Just you and your coins making moves. Lower fees, faster settlement.",
    ],
    takeaway: "Bitcoin came first, launched by an anonymous creator, and it proved money could exist without a central authority. Newer programmable blockchains added smart contracts — code that executes itself when its conditions are met — which opened the door to everything that came after.",
    quote: "The more you know, the fewer headaches down the road. Arm yourself first.",
    chips: [], redFlag: null,
  },
  {
    id: '02', code: 'SECURITY', title: "Don't get got", readTime: '4 min', color: '#FF4D4D',
    body: [
      "My first crypto move was a straight-up scam. Learned the hard way you can't trust everyone out here. Securing your assets is the whole game.",
      "Turn on two-factor authentication everywhere. Never click suspicious links. Double-check every web address before you connect a wallet or log in.",
    ],
    takeaway: "The golden rule is a hardware (cold) wallet — a physical device that keeps your private keys offline, where hackers can't reach them.",
    quote: null, chips: [],
    redFlag: "No real support team will ever message you asking for your keys or your seed phrase. If someone does, it's a scam. Full stop.",
  },
  {
    id: '03', code: 'ACCOUNTS', title: 'Set up your foundation', readTime: '4 min', color: '#21D4C4',
    body: [
      "A centralized exchange is where most people buy their first coins — you create an account, verify your identity, and turn on two-factor authentication before anything else.",
    ],
    takeaway: "You'll use two kinds of wallets — a hot wallet (connected to the internet) for everyday moves, and a cold wallet (offline hardware) for the bulk you're holding long term. Your seed phrase is the master key to all of it: write it down, store it offline, never share it.",
    quote: null,
    chips: ['Hot wallet', 'Cold wallet', 'Two-factor auth', 'Seed phrase'],
    redFlag: "Don't leave large balances sitting on an exchange. Exchanges get hacked. Move your stack to a wallet only you control.",
  },
  {
    id: '04', code: 'DEFI', title: 'Be your own bank', readTime: '3 min', color: '#7C5CFC',
    body: [
      "Decentralized finance rebuilds lending, borrowing, and trading with no middleman. You become the bank.",
    ],
    takeaway: "It runs on smart contracts on programmable blockchains. The real breakthrough is access — no credit score, no gatekeeper, anyone with a connection is in. That matters most for people who've been shut out of the traditional system.",
    quote: null, chips: [],
    redFlag: "It's still early and still risky. Contract bugs, hacks, and wild volatility are real. Do your homework, and never put in more than you can afford to lose.",
  },
  {
    id: '05', code: 'PROTOCOLS', title: 'Using the tools', readTime: '5 min', color: '#2E8BFF',
    body: [
      "A decentralized exchange lets you swap tokens straight from your wallet — often new projects before they reach the bigger platforms. Watch two things: gas fees (network costs, cheaper off-peak) and slippage (the gap between the price you expect and the price you actually get).",
    ],
    takeaway: "Liquidity pools pay you a cut of trading fees for locking up tokens, but watch for impermanent loss when the pooled prices drift apart. Yield farming stacks extra rewards on top — more upside, but more complexity and more risk.",
    quote: null, chips: [],
    redFlag: "Sky-high advertised yields are a warning sign, not a gift. Usually unsustainable, sometimes an outright trap.",
  },
  {
    id: '06', code: 'RESEARCH', title: 'Do the homework', readTime: '4 min', color: '#F2C14E',
    body: [
      "This is where instincts pay off. Start with the whitepaper — the project's blueprint. A clear problem, real technology, an honest roadmap. All jargon and no substance? Red flag.",
    ],
    takeaway: "Check three things — the team (real names, real track record), the community (active and constructive, not toxic or dead), and the tokenomics (how many tokens exist, who holds them, and what the token is actually for). A huge share held by insiders means dump risk.",
    quote: null,
    chips: ['Whitepaper', 'Team', 'Community', 'Tokenomics'],
    redFlag: null,
  },
  {
    id: '07', code: 'RISK', title: 'Stay in the game', readTime: '4 min', color: '#FF7A1A',
    body: [
      "Never invest more than you can afford to lose — cliché because it's true. The market swings hard. Spread your bets. Don't put everything in one basket.",
    ],
    takeaway: "Know the DeFi-specific risks — contract bugs, hacks, and rug pulls, where developers vanish with the money. Favor projects reviewed by reputable third-party auditors. Audits aren't bulletproof, but they're a layer.",
    quote: null, chips: [],
    redFlag: "Greed is the enemy. Set your exit targets before you're emotional, and hold the line. An automatic stop can protect your gains without you watching the screen all day.",
  },
  {
    id: '08', code: 'PROFITS', title: 'Get paid, keep it', readTime: '4 min', color: '#24C38A',
    body: [
      "Set clear targets before you're in the trade. What goes up can come down just as fast. Sell in stages — a slice at your first target, another at the next — so you lock gains while still riding the upside.",
    ],
    takeaway: "Park profits in stablecoins (pegged to a major currency) to sit out volatility without cashing all the way to fiat. Reinvest with the same discipline — no chasing the next shiny thing.",
    quote: null, chips: [],
    redFlag: "Crypto profits are taxable. Keep clean records from day one, and consider crypto-specific tax software or a tax professional who understands the space. It saves real money later.",
  },
];

export const GLOSSARY = [
  { term: 'Blockchain', def: "A shared, tamper-proof ledger. Every transaction is recorded across many computers, so no one can quietly rewrite it." },
  { term: 'Smart contract', def: "Code that executes itself when its conditions are met. The backbone of decentralized finance." },
  { term: 'DeFi', def: "Decentralized finance: lending, borrowing, and trading with no bank in the middle." },
  { term: 'Hot wallet', def: "A wallet connected to the internet. Convenient, but more exposed." },
  { term: 'Cold wallet', def: "An offline hardware wallet. The safest place for long-term holdings." },
  { term: 'Seed phrase', def: "The 12–24 words that recover your wallet. Anyone who has it owns your funds. Never share it, never store it online." },
  { term: 'Gas fee', def: "The cost to process a transaction on the network. Rises when the network is busy." },
  { term: 'Slippage', def: "The gap between the price you expect and the price you actually get. Worse in volatile or thin markets." },
  { term: 'Impermanent loss', def: "The loss liquidity providers can face when the prices of pooled tokens drift apart." },
  { term: 'Rug pull', def: "When developers abandon a project and run off with investors' money." },
  { term: 'Stablecoin', def: "A token pegged to a major currency. A safe harbor during volatility." },
  { term: 'KYC', def: '"Know Your Customer": the identity check reputable exchanges require.' },
  { term: 'Tokenomics', def: "The economics of a token: its supply, distribution, and what it's actually used for." },
  { term: 'DEX', def: "A decentralized exchange where you trade straight from your wallet." },
];

export const RED_FLAGS = [
  'A "support" message asking for your keys or seed phrase',
  'Guaranteed or "risk-free" returns',
  'Yields that sound too good to be true',
  'An anonymous team with no track record',
  "A whitepaper that's all hype, no substance",
  'Pressure to act now / fear of missing out',
  'A huge share of tokens held by insiders',
  'No third-party audit',
];

export const SECURITY_CHECKLIST = [
  'Set up a hardware (cold) wallet',
  'Enable two-factor authentication on every account',
  'Write your seed phrase on paper and store it offline',
  'Bookmark the real web addresses; never click links from messages or email',
  'Send a small test transaction first',
  'Move large balances off exchanges',
];
