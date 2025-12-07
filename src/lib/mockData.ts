// Mock data for NexusVote multi-page UI

export const mockWalletAddress = "0x1234...abC9";

export const mockReputationScore = 850;

export const mockVotingHistory = [
  {
    id: "prop-1",
    title: "Enable Layer-2 Rollup Support",
    outcome: "Passed",
    votedFor: "Yes",
    date: "2025-10-01",
  },
  {
    id: "prop-2",
    title: "Treasury Diversification into ETH",
    outcome: "Rejected",
    votedFor: "No",
    date: "2025-10-15",
  },
  {
    id: "prop-3",
    title: "Launch Community Grants Program",
    outcome: "Passed",
    votedFor: "Yes",
    date: "2025-11-03",
  },
];

export const mockBadges = [
  {
    id: "badge-founder",
    label: "DAO Founder",
    description: "Early architect of the NexusVote governance protocol.",
    icon: "⚡",
  },
  {
    id: "badge-whale",
    label: "Whale Guardian",
    description: "Holds significant voting power in the DAO.",
    icon: "🐳",
  },
  {
    id: "badge-active",
    label: "Active Voter",
    description: "Participated in 50+ on-chain votes.",
    icon: "🔥",
  },
  {
    id: "badge-delegate",
    label: "Top Delegate",
    description: "Frequently trusted with delegated voting power.",
    icon: "🎖️",
  },
];

export const mockDelegates = [
  {
    id: "alice",
    handle: "Alice.eth",
    votingPower: 24,
    participationRate: 98,
  },
  {
    id: "bob",
    handle: "Bob.sol",
    votingPower: 18,
    participationRate: 94,
  },
  {
    id: "carol",
    handle: "Carol.near",
    votingPower: 15,
    participationRate: 91,
  },
  {
    id: "dave",
    handle: "Dave.lens",
    votingPower: 11,
    participationRate: 88,
  },
  {
    id: "eve",
    handle: "Eve.dao",
    votingPower: 9,
    participationRate: 86,
  },
];

export const tokenDistributionData = [
  { name: "Whales", value: 62 },
  { name: "Retail", value: 38 },
];

export const votesPerProposalData = [
  { name: "Prop 21", votes: 320 },
  { name: "Prop 22", votes: 280 },
  { name: "Prop 23", votes: 410 },
  { name: "Prop 24", votes: 360 },
  { name: "Prop 25", votes: 390 },
];

export const turnoutOverTimeData = [
  { name: "Week 1", turnout: 42 },
  { name: "Week 2", turnout: 55 },
  { name: "Week 3", turnout: 48 },
  { name: "Week 4", turnout: 63 },
  { name: "Week 5", turnout: 71 },
];
