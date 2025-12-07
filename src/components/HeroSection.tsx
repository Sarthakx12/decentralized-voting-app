import { Wallet, Shield, Zap, Globe } from 'lucide-react';

interface HeroSectionProps {
  onConnectWallet: () => void;
  isConnecting: boolean;
}

const HeroSection = ({ onConnectWallet, isConnecting }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-float delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-neon-cyan/3 to-transparent rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-3 glass-card px-6 py-3 neon-border">
            <div className="w-10 h-10 rounded-lg bg-neon-gradient flex items-center justify-center">
              <Shield className="w-6 h-6 text-space-darker" />
            </div>
            <span className="font-display text-xl font-bold tracking-wider text-foreground">
              NEXUS<span className="text-primary">VOTE</span>
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up delay-100">
          <span className="block text-foreground">The Future of</span>
          <span className="block gradient-text mt-2">Decentralized Governance</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up delay-200">
          Cast your vote on the blockchain. Transparent, immutable, and secured by 
          <span className="text-primary"> quantum-resistant cryptography</span>.
        </p>

        {/* Connect Button */}
        <div className="animate-fade-up delay-300">
          <button
            onClick={onConnectWallet}
            disabled={isConnecting}
            className="group relative inline-flex items-center gap-3 px-8 py-4 font-display font-semibold text-lg 
                     bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl
                     transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Wallet className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-[-2px] rounded-xl bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink 
                            animate-rotate-gradient bg-[length:200%_200%] -z-10 blur-sm" />
            </div>
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-up delay-400">
          {[
            { icon: Shield, title: 'Quantum Secure', desc: 'Protected by next-gen encryption' },
            { icon: Zap, title: 'Instant Finality', desc: 'Votes confirmed in milliseconds' },
            { icon: Globe, title: 'Truly Decentralized', desc: 'No central point of failure' },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="glass-card p-6 hover-lift group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto
                           group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;
