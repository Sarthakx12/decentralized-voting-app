import { useState } from "react";
import { toast } from "sonner";

const CreateProposal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [options, setOptions] = useState<string[]>([""]);

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      deadline,
      options: options.filter((o) => o.trim().length > 0),
    };

    console.log("New proposal submitted", payload);
    toast.success("Proposal submitted to the NexusVote council.");

    setTitle("");
    setDescription("");
    setDeadline("");
    setOptions([""]);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background grid-pattern">
      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Launch a New Proposal
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-2xl">
          Define the parameters of your governance proposal. This interface is wired for demo
          purposes and does not write on-chain yet.
        </p>

        <form
          onSubmit={handleSubmit}
          className="glass-card border border-border/60 rounded-2xl p-5 sm:p-6 space-y-5"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg bg-background/40 border border-border/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan/80 focus:border-neon-cyan/80 shadow-[0_0_20px_rgba(0,240,255,0.08)]"
              placeholder="e.g. Enable Layer-2 Rollup Support"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded-lg bg-background/40 border border-border/60 px-3 py-2 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-neon-purple/80 focus:border-neon-purple/80 shadow-[0_0_24px_rgba(112,0,255,0.25)]"
              placeholder="Describe the proposal, its impact, and any technical details."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">Voting Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="w-full rounded-lg bg-background/40 border border-border/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan/80 focus:border-neon-cyan/80"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label className="block text-sm font-medium text-muted-foreground">
                Candidates / Options
              </label>
              <button
                type="button"
                onClick={handleAddOption}
                className="text-xs px-3 py-1 rounded-full border border-neon-cyan/60 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
              >
                Add Option
              </button>
            </div>

            <div className="space-y-2">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required={index < 2}
                    className="flex-1 rounded-lg bg-background/40 border border-border/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary/80"
                    placeholder={`Option ${index + 1}`}
                  />
                  {options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="text-xs px-2 py-1 rounded-full border border-destructive/60 text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-display text-sm sm:text-base font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary shadow-[0_0_30px_rgba(0,240,255,0.55)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] hover:scale-[1.02] transition-transform duration-200"
            >
              <span className="relative z-10">Execute Proposal</span>
              <span className="absolute inset-0 rounded-xl border border-neon-cyan/60 opacity-60" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateProposal;
