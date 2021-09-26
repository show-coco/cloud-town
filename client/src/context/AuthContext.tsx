import React, { ReactChild, useContext, useState } from "react";
import { FirebaseAuthAdapter } from "../adapter/auth/FirebaseAuthAdapter";
import { IAuthAdapter } from "../adapter/auth/IAuthAdapter";
import { UserQuery } from "../graphql/generated/types";
import { useInitialize } from "../hooks/useInitialize";

type Community = {
  id: string;
  name: string;
  slug: string;
  iconUrl?: string;
};

export type User = {
  id: string;
  name: string;
  slug: string;
  email: string;
  authId: string;
  communities: Community[] | undefined;
};

export const mapToAuthUser = (data: UserQuery): User => {
  const user = data.users[0];
  const communities: User["communities"] = data?.users[0].community_members.map(
    ({ community }) => {
      return {
        id: community.id,
        name: community.name,
        iconUrl: community.icon_url || undefined,
        slug: community.slug,
      };
    }
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    slug: user.slug,
    authId: user.auth_id,
    communities,
  };
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
