import React from 'react';

const ClerkProviderWrapper = ({ children }) => {
  // For now, render children without Clerk to avoid routing issues
  console.warn('Running without Clerk authentication for testing.');
  return <>{children}</>;
};

export default ClerkProviderWrapper;
