import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { LogOut, Shield, BarChart3, Wallet } from 'lucide-react';
import { auth, CANDIDATES, Vote, VoteTally, castVote, hasUserVoted, getUserVote, subscribeToVotes, subscribeToTally } from '@/lib/firebase';
import CandidateCard from './CandidateCard';
import LiveLedger from './LiveLedger';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [tally, setTally] = useState<VoteTally>({});
  const [userHasVoted, setUserHasVoted] = useState(false);
  const [userVotedFor, setUserVotedFor] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already voted
    const checkVoteStatus = async () => {
      const voted = await hasUserVoted(user.uid);
      setUserHasVoted(voted);
      if (voted) {
        const candidateId = await getUserVote(user.uid);
        setUserVotedFor(candidateId);
      }
    };
    checkVoteStatus();

    // Subscribe to live updates
    const unsubVotes = subscribeToVotes(setVotes);
    const unsubTally = subscribeToTally(setTally);

    return () => {
      unsubVotes();
      unsubTally();
    };
  }, [user.uid]);

  const totalVotes = Object.values(tally).reduce((acc, count) => acc + count, 0);

  const handleVote = async (candidateId: string, candidateName: string) => {
    if (userHasVoted) {
      toast({
        title: "Already Voted",
        description: "You have already cast your vote in this election.",
        variant: "destructive",
      });
      return;
    }

    setIsVoting(true);
    setSelectedCandidate(candidateId);

    try {
      const txHash = await castVote(user.uid, candidateId, candidateName);
      setUserHasVoted(true);
      setUserVotedFor(candidateId);
      
      toast({
        title: "Vote Cast Successfully! 🎉",
        description: (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-1">Transaction confirmed:</p>
            <code className="text-xs font-mono bg-muted p-1 rounded block truncate">
              {txHash}
            </code>
          </div>
        ),
      });
    } catch (error) {
      console.error('Error casting vote:', error);
      toast({
        title: "Transaction Failed",
        description: "Unable to process your vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
      setSelectedCandidate(null);
    }
  };

  const truncatedAddress = `${user.uid.slice(0, 8)}...${user.uid.slice(-6)}`;

  return (
    <div className="min-h-screen grid-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon-gradient flex items-center justify-center">
                <Shield className="w-6 h-6 text-space-darker" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-foreground">
                NEXUS<span className="text-primary">VOTE</span>
              </span>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 glass-card px-4 py-2">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-foreground">{truncatedAddress}</span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-destructive/20 
                         text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Bar */}
        <div className="glass-card p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span className="font-display text-sm text-foreground">Election Statistics</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-mono text-2xl font-bold text-primary">{totalVotes}</p>
              <p className="text-xs text-muted-foreground">Total Votes</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-2xl font-bold text-secondary">{CANDIDATES.length}</p>
              <p className="text-xs text-muted-foreground">Candidates</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-2xl font-bold text-neon-pink">{votes.length}</p>
              <p className="text-xs text-muted-foreground">Transactions</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Candidates Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Governance Proposals
            </h2>
            <div className="grid gap-6">
              {CANDIDATES.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  {...candidate}
                  votes={tally[candidate.id] || 0}
                  totalVotes={totalVotes}
                  isSelected={selectedCandidate === candidate.id}
                  hasVoted={userHasVoted}
                  userVotedFor={userVotedFor}
                  onVote={() => handleVote(candidate.id, candidate.name)}
                  isVoting={isVoting && selectedCandidate === candidate.id}
                />
              ))}
            </div>
          </div>

          {/* Live Ledger Column */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Real-time Ledger
            </h2>
            <div className="h-[600px]">
              <LiveLedger votes={votes} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12 py-6 backdrop-blur-xl bg-background/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground font-mono">
            Powered by <span className="text-primary">NexusVote</span> Blockchain Protocol v1.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
