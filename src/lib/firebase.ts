import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit,
  doc,
  setDoc,
  getDoc,
  Timestamp,
  updateDoc,
  increment
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCbezEqUV3PKD79IOvzQGLNfi34h6Cw0-8",
  authDomain: "nexus-vote-d2d19.firebaseapp.com",
  projectId: "nexus-vote-d2d19",
  storageBucket: "nexus-vote-d2d19.firebasestorage.app",
  messagingSenderId: "815870783662",
  appId: "1:815870783662:web:222f151f12b823dc01fd3f",
  measurementId: "G-3YFD0E7SWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth functions
export const connectWallet = async (): Promise<User> => {
  const result = await signInAnonymously(auth);
  return result.user;
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Generate fake transaction hash
export const generateTxHash = (): string => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

// Generate fake wallet address
export const generateWalletAddress = (): string => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

// Candidates data
export const CANDIDATES: {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: 'cyan' | 'purple' | 'pink';
}[] = [
  {
    id: 'quantum-initiative',
    name: 'Quantum Initiative',
    description: 'Pioneering quantum-resistant blockchain protocols',
    icon: '⚛️',
    color: 'cyan',
  },
  {
    id: 'stellar-consensus',
    name: 'Stellar Consensus',
    description: 'Interstellar governance through distributed consensus',
    icon: '✨',
    color: 'purple',
  },
  {
    id: 'nebula-protocol',
    name: 'Nebula Protocol',
    description: 'Decentralized cloud computing for the cosmos',
    icon: '🌌',
    color: 'pink',
  },
];

// Vote types
export interface Vote {
  id?: string;
  candidateId: string;
  candidateName: string;
  txHash: string;
  walletAddress: string;
  timestamp: Timestamp;
}

export interface VoteTally {
  [candidateId: string]: number;
}

// Firestore functions
export const castVote = async (userId: string, candidateId: string, candidateName: string): Promise<string> => {
  const txHash = generateTxHash();
  const walletAddress = generateWalletAddress();
  
  // Add vote to ledger
  await addDoc(collection(db, 'votes'), {
    candidateId,
    candidateName,
    txHash,
    walletAddress,
    userId,
    timestamp: Timestamp.now(),
  });

  // Update vote count
  const tallyRef = doc(db, 'tally', candidateId);
  const tallyDoc = await getDoc(tallyRef);
  
  if (tallyDoc.exists()) {
    await updateDoc(tallyRef, {
      count: increment(1)
    });
  } else {
    await setDoc(tallyRef, {
      count: 1
    });
  }

  // Mark user as voted
  await setDoc(doc(db, 'userVotes', userId), {
    candidateId,
    votedAt: Timestamp.now(),
  });

  return txHash;
};

export const hasUserVoted = async (userId: string): Promise<boolean> => {
  const userVoteDoc = await getDoc(doc(db, 'userVotes', userId));
  return userVoteDoc.exists();
};

export const getUserVote = async (userId: string): Promise<string | null> => {
  const userVoteDoc = await getDoc(doc(db, 'userVotes', userId));
  if (userVoteDoc.exists()) {
    return userVoteDoc.data().candidateId;
  }
  return null;
};

export const subscribeToVotes = (callback: (votes: Vote[]) => void) => {
  const votesQuery = query(
    collection(db, 'votes'),
    orderBy('timestamp', 'desc'),
    limit(50)
  );

  return onSnapshot(votesQuery, (snapshot) => {
    const votes: Vote[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Vote));
    callback(votes);
  });
};

export const subscribeToTally = (callback: (tally: VoteTally) => void) => {
  return onSnapshot(collection(db, 'tally'), (snapshot) => {
    const tally: VoteTally = {};
    snapshot.docs.forEach((doc) => {
      tally[doc.id] = doc.data().count || 0;
    });
    callback(tally);
  });
};
