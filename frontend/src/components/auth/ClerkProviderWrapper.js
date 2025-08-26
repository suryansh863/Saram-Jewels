import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

const clerkKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const ClerkProviderWrapper = ({ children }) => {
  // If Clerk key is not available, render children without authentication
  if (!clerkKey) {
    console.warn('Clerk publishable key not found. Running without authentication.');
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={clerkKey}>{children}</ClerkProvider>
  );
};

export default ClerkProviderWrapper;
