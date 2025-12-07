import { Activity, ExternalLink, Clock } from 'lucide-react';
import { Vote } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface LiveLedgerProps {
  votes: Vote[];
}

const LiveLedger = ({ votes }: LiveLedgerProps) => {
  const getColorByCandidate = (candidateId: string) => {
    switch (candidateId) {
      case 'quantum-initiative':
        return 'cyan';
      case 'stellar-consensus':
        return 'purple';
      case 'nebula-protocol':
        return 'pink';
      default:
        return 'cyan';
    }
  };

  const colorClasses = {
    cyan: 'text-neon-cyan border-neon-cyan/30',
    purple: 'text-neon-purple border-neon-purple/30',
    pink: 'text-neon-pink border-neon-pink/30',
  };

  return (
    <div className="glass-card h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Activity className="w-5 h-5 text-primary" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full pulse-live" />
          </div>
          <h2 className="font-display font-semibold text-foreground">Live Ledger</h2>
          <span className="ml-auto text-xs text-muted-foreground font-mono">
            {votes.length} transactions
          </span>
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scan-line relative">
        {votes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Activity className="w-12 h-12 mb-4 opacity-30" />
            <p className="text-sm">No transactions yet</p>
            <p className="text-xs">Be the first to vote!</p>
          </div>
        ) : (
          votes.map((vote, index) => {
            const color = getColorByCandidate(vote.candidateId);
            const timestamp = vote.timestamp?.toDate?.() || new Date();
            const walletAddr = vote.walletAddress || '0x0000000000000000000000000000000000000000';
            const txHash = vote.txHash || 'Unknown';
            
            return (
              <div
                key={vote.id}
                className={cn(
                  'p-3 rounded-lg bg-muted/30 border animate-fade-in',
                  colorClasses[color as keyof typeof colorClasses]
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Candidate Name */}
                <div className="flex items-center justify-between mb-2">
                  <span className={cn('font-display text-sm font-medium', colorClasses[color as keyof typeof colorClasses].split(' ')[0])}>
                    {vote.candidateName || 'Unknown'}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(timestamp, { addSuffix: true })}
                  </div>
                </div>

                {/* Transaction Hash */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">TX:</span>
                  <code className="text-xs font-mono text-foreground/80 truncate flex-1">
                    {txHash}
                  </code>
                  <button 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => navigator.clipboard.writeText(txHash)}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Wallet Address */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">From:</span>
                  <code className="text-xs font-mono text-foreground/60 truncate">
                    {walletAddr.slice(0, 10)}...{walletAddr.slice(-8)}
                  </code>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border/50 bg-muted/20">
        <p className="text-xs text-center text-muted-foreground font-mono">
          All transactions verified on-chain
        </p>
      </div>
    </div>
  );
};

export default LiveLedger;
