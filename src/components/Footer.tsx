import { Github, Twitter, Globe } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="font-display text-base font-semibold text-foreground">
            NEXUS<span className="text-primary">VOTE</span>
          </span>
          <span>
            © {year} NexusVote. All rights reserved.
          </span>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/Sarthakx12"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Twitter className="w-4 h-4" />
            <span className="hidden sm:inline">Twitter</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Website</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
