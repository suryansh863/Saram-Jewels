import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-200">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Create Your Saram Account</h2>
        <SignUp
          path="/signup"
          routing="path"
          signInUrl="/login"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg',
              card: 'shadow-md',
              headerTitle: 'text-purple-700',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
