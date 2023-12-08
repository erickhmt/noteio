import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import React, { createContext, useEffect } from "react";

import { FIREBASE_AUTH } from "../FirebaseConfig";

const initialUserState = {
  uid: "",
  createdAt: "",
  displayName: "",
  username: "",
  lastLoginAt: "",
  photoUrl: "",
  providerId: "",
  email: "",
  token: "",
};

const contextInitialState = {
  user: initialUserState,
  signIn: async (token) => {},
  signOut: async () => {},
};

const AuthContext = createContext(contextInitialState);

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(initialUserState);

  const signIn = (token) => setUser({ token, ...user });

  const signOut = () => {
    setUser(null);
    firebaseSignOut(FIREBASE_AUTH);
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      console.log("*****************************************");
      console.log("****************** USER ", user);
      if (user) {
        const { uid, displayName, email, photoURL, providerId } = user;
        const createdAt = user.metadata.creationTime;
        const lastLoginAt = user.metadata.lastSignInTime;

        setUser({
          uid,
          createdAt,
          displayName,
          lastLoginAt,
          photoUrl: photoURL,
          providerId,
          email,
          ...user,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
