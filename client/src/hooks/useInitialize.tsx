import { useEffect } from "react";
import { User } from "../context/AuthContext";
import { useUserLazyQuery } from "../graphql/generated/types";
import { tokenManager } from "../utils/jwtManager";

export type UseInitializeReturns = {
  loading: boolean;
};

export const useInitialize = (
  setUser: (user: User) => void
): UseInitializeReturns => {
  const [fetchUser, { loading }] = useUserLazyQuery({
    onCompleted: (data) => {
      const user = data.users[0];
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        slug: user.slug,
        authId: user.auth_id,
      });
    },
  });

  useEffect(() => {
    const { authId } = tokenManager.getToken();
    if (authId) {
      console.log(authId);
      fetchUser({
        variables: {
          authId,
        },
      });
    }
  }, []);

  return {
    loading,
  };
};
