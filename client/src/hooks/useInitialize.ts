import { useEffect } from "react";
import { mapToAuthUser, User } from "../context/AuthContext";
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
      setUser(mapToAuthUser(data));
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
