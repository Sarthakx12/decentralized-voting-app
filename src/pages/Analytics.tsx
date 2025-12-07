import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  tokenDistributionData,
  votesPerProposalData,
  turnoutOverTimeData,
} from "@/lib/mockData";

const COLORS = ["#00f0ff", "#7000ff"];

const Analytics = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background grid-pattern">
      <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        <header className="space-y-2">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Network Analytics
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Visualize the health of the NexusVote ecosystem — token distribution, proposal
            activity, and voter turnout over time.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <div className="glass-card border border-border/60 rounded-2xl p-4 sm:p-5 flex flex-col">
            <h2 className="font-display text-lg text-foreground mb-4">Token Distribution</h2>
            <div className="flex-1 min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tokenDistributionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {tokenDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#0b1020"
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#050816",
                      border: "1px solid rgba(0,240,255,0.4)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="glass-card border border-border/60 rounded-2xl p-4 sm:p-5 flex flex-col">
            <h2 className="font-display text-lg text-foreground mb-4">Votes per Proposal</h2>
            <div className="flex-1 min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={votesPerProposalData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#050816",
                      border: "1px solid rgba(112,0,255,0.6)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="votes" radius={[4, 4, 0, 0]} fill="#7000ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart */}
          <div className="glass-card border border-border/60 rounded-2xl p-4 sm:p-5 flex flex-col">
            <h2 className="font-display text-lg text-foreground mb-4">Voter Turnout Over Time</h2>
            <div className="flex-1 min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={turnoutOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis
                    unit="%"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#050816",
                      border: "1px solid rgba(0,240,255,0.6)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="turnout"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4, stroke: "#0b1120", strokeWidth: 1 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Analytics;
