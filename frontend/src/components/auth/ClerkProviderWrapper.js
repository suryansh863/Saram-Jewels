import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

const clerkKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const ClerkProviderWrapper = ({ children }) => (
  <ClerkProvider publishableKey={clerkKey}>{children}</ClerkProvider>
);

export default ClerkProviderWrapper;
