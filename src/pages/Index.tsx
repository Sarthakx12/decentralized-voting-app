import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { connectWallet, onAuthChange, auth } from '@/lib/firebase';
import HeroSection from '@/components/HeroSection';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
      toast({
        title: "Wallet Connected! 🔗",
        description: "You are now connected to the NexusVote network.",
      });
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        title: "Connection Failed",
        description: "Unable to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({
        title: "Disconnected",
        description: "Your wallet has been disconnected.",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background grid-pattern">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-gradient animate-pulse" />
          <p className="font-display text-lg text-foreground">Initializing Protocol...</p>
          <p className="text-sm text-muted-foreground mt-2 font-mono">Connecting to NexusVote Network</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <HeroSection onConnectWallet={handleConnectWallet} isConnecting={isConnecting} />
      )}
      <Footer />
      <Toaster />
    </>
  );
};

export default Index;
