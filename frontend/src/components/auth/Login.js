import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-700">Login to Saram</h2>
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/signup"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg',
              card: 'shadow-md',
              headerTitle: 'text-pink-700',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;
