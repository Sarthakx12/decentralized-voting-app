import { Check, Vote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CandidateCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: 'cyan' | 'purple' | 'pink';
  votes: number;
  totalVotes: number;
  isSelected: boolean;
  hasVoted: boolean;
  userVotedFor: string | null;
  onVote: () => void;
  isVoting: boolean;
}

const CandidateCard = ({
  id,
  name,
  description,
  icon,
  color,
  votes,
  totalVotes,
  isSelected,
  hasVoted,
  userVotedFor,
  onVote,
  isVoting,
}: CandidateCardProps) => {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  const isUserChoice = userVotedFor === id;

  const colorClasses = {
    cyan: {
      bar: 'bg-neon-cyan',
      text: 'text-neon-cyan',
      glow: 'shadow-[0_0_20px_rgba(0,255,255,0.3)]',
      border: 'border-neon-cyan/50',
    },
    purple: {
      bar: 'bg-neon-purple',
      text: 'text-neon-purple',
      glow: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]',
      border: 'border-neon-purple/50',
    },
    pink: {
      bar: 'bg-neon-pink',
      text: 'text-neon-pink',
      glow: 'shadow-[0_0_20px_rgba(236,72,153,0.3)]',
      border: 'border-neon-pink/50',
    },
  };

  const styles = colorClasses[color];

  return (
    <div
      className={cn(
        'glass-card p-6 hover-lift transition-all duration-300',
        isSelected && 'ring-2 ring-primary',
        isUserChoice && styles.glow
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <h3 className="font-display font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {isUserChoice && (
          <div className={cn('px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1', styles.text)}>
            <Check className="w-3 h-3" />
            Your Vote
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className={cn('font-mono font-semibold', styles.text)}>
            {votes.toLocaleString()} votes
          </span>
          <span className="text-muted-foreground font-mono">{percentage}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-700 ease-out', styles.bar)}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Vote Button */}
      <button
        onClick={onVote}
        disabled={hasVoted || isVoting}
        className={cn(
          'w-full py-3 px-4 rounded-lg font-display font-medium text-sm',
          'flex items-center justify-center gap-2 transition-all duration-300',
          hasVoted
            ? 'bg-muted text-muted-foreground cursor-not-allowed'
            : cn(
                'bg-gradient-to-r hover:scale-[1.02] active:scale-[0.98]',
                color === 'cyan' && 'from-neon-cyan to-cyan-600 text-space-darker',
                color === 'purple' && 'from-neon-purple to-purple-700 text-foreground',
                color === 'pink' && 'from-neon-pink to-pink-700 text-space-darker'
              )
        )}
      >
        {isVoting ? (
          <span className="animate-pulse">Processing Transaction...</span>
        ) : hasVoted ? (
          <span>{isUserChoice ? 'Vote Recorded' : 'Already Voted'}</span>
        ) : (
          <>
            <Vote className="w-4 h-4" />
            <span>Cast Vote</span>
          </>
        )}
      </button>
    </div>
  );
};

export default CandidateCard;
