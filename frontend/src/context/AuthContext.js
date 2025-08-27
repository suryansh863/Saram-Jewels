import React, { createContext, useContext, useState, useEffect } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signIn, signUp } = useClerk();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
    }
  }, [isLoaded]);

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const login = async (email, password) => {
    try {
      const result = await signIn.authenticateWithPassword({
        identifier: email,
        password: password,
      });
      
      if (result.status === 'complete') {
        return { success: true };
      } else {
        return { success: false, error: 'Authentication failed' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      // Validate password strength
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return { 
          success: false, 
          error: passwordValidation.errors.join(', ') 
        };
      }

      const result = await signUp.create({
        emailAddress: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });

      if (result.status === 'complete') {
        return { success: true };
      } else {
        return { success: false, error: 'Signup failed' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Signup failed' };
    }
  };

  const loginWithGoogle = async () => {
    try {
      // For Clerk v4, we need to use the OAuth flow differently
      // This will redirect to Clerk's hosted OAuth page
      window.location.href = `${window.location.origin}/sign-in?oauth=google`;
      return { success: true };
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: error.message || 'Google login failed' };
    }
  };

  const signupWithGoogle = async () => {
    try {
      // For Clerk v4, we need to use the OAuth flow differently
      // This will redirect to Clerk's hosted OAuth page
      window.location.href = `${window.location.origin}/sign-up?oauth=google`;
      return { success: true };
    } catch (error) {
      console.error('Google signup error:', error);
      return { success: false, error: error.message || 'Google signup failed' };
    }
  };

  const logout = async () => {
    try {
      if (signIn && typeof signIn.destroy === 'function') {
        await signIn.destroy();
      } else {
        // Fallback logout
        window.location.href = '/sign-out';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isSignedIn,
    isLoaded: !isLoading,
    login,
    signup,
    loginWithGoogle,
    signupWithGoogle,
    logout,
    validatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
