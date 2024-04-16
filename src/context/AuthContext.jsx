import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// Create AuthContext
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) setCurrentUser(null);

      setCurrentUser({
        id: user.uid,
        displayName: user.displayName,
        email: user.email,
      });
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};