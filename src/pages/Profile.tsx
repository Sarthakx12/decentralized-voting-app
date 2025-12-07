import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { mockWalletAddress, mockReputationScore, mockVotingHistory, mockBadges } from "@/lib/mockData";

const Profile = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background grid-pattern">
      <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border border-neon-cyan/60 shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-display text-xl">
                SV
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Voter Profile
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono mt-1">
                {mockWalletAddress}
              </p>
            </div>
          </div>

          <div className="glass-card px-4 py-3 rounded-xl border border-border/60 text-right max-w-xs ml-auto">
            <p className="text-xs text-muted-foreground">Reputation Score</p>
            <p className="font-display text-2xl font-semibold text-neon-cyan">
              {mockReputationScore}
              <span className="text-xs text-muted-foreground ml-1">XP</span>
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Higher scores unlock advanced governance rights.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Voting history */}
          <Card className="glass-card border border-border/60 lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Voting History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockVotingHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2.5 text-sm"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                      Voted: {item.votedFor} · {item.date}
                    </p>
                  </div>
                  <span
                    className={
                      "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold " +
                      (item.outcome === "Passed"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-red-500/15 text-red-300")
                    }
                  >
                    {item.outcome}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="glass-card border border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-cyan rounded-full" />
                NFT Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {mockBadges.map((badge) => (
                  <Tooltip key={badge.id}>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center justify-center rounded-xl border border-border/60 bg-background/40 px-3 py-3 cursor-default hover:border-neon-cyan/70 hover:shadow-[0_0_24px_rgba(0,240,255,0.35)] transition-all">
                        <div className="text-2xl mb-1">{badge.icon}</div>
                        <p className="text-xs font-medium text-foreground text-center">
                          {badge.label}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      {badge.description}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Profile;
