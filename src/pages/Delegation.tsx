import { useState } from "react";
import { mockDelegates } from "@/lib/mockData";

const Delegation = () => {
  const [activeDelegateId, setActiveDelegateId] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background grid-pattern">
      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-6">
        <header className="space-y-2">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Liquid Democracy
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Delegate your voting power to trusted representatives. You keep full control and can
            revoke delegation at any time.
          </p>
        </header>

        <section className="glass-card border border-border/60 rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="font-display text-lg text-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-neon-cyan rounded-full" />
            Available Delegates
          </h2>

          <div className="space-y-3">
            {mockDelegates.map((delegate) => {
              const isActive = activeDelegateId === delegate.id;
              return (
                <div
                  key={delegate.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/40 px-4 py-3"
                >
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">
                      {delegate.handle}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Voting Power: <span className="text-neon-cyan">{delegate.votingPower}%</span>{" "}
                      · Participation: <span className="text-neon-purple">{delegate.participationRate}%</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDelegateId((current) =>
                        current === delegate.id ? null : delegate.id
                      )
                    }
                    className={
                      "w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors " +
                      (isActive
                        ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/60"
                        : "bg-primary text-primary-foreground hover:brightness-110 border border-primary/70")
                    }
                  >
                    {isActive ? "Delegated" : "Delegate My Vote"}
                  </button>
                </div>
              );
            })}
          </div>

          {activeDelegateId && (
            <p className="text-xs text-muted-foreground font-mono pt-2">
              Active delegate: {mockDelegates.find((d) => d.id === activeDelegateId)?.handle}
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Delegation;
