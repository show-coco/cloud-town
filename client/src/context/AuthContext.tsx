import React, { ReactChild, useContext, useState } from "react";
import { FirebaseAuthAdapter } from "../adapter/auth/FirebaseAuthAdapter";
import { IAuthAdapter } from "../adapter/auth/IAuthAdapter";
import { useInitialize } from "../hooks/useInitialize";

export type User = {
  id: string;
  name: string;
  slug: string;
  email: string;
  authId: string;
};

export type AuthContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  auth: IAuthAdapter;
  loading: boolean;
  isAuthenticated: boolean;
};

const authAdapter = new FirebaseAuthAdapter();

export const AuthContext = React.createContext<AuthContextType>({
  setUser: () => {
    throw new Error("AuthContext is not implemented");
  },
  auth: authAdapter,
  loading: true,
  isAuthenticated: false,
});

type Props = {
  children: ReactChild;
};

export const useAuthContext = (): AuthContextType => useContext(AuthContext);

const AuthContextProvider: React.VFC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>();

  const { loading } = useInitialize(setUser);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        auth: authAdapter,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
