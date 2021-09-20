import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useUserLazyQuery } from "../graphql/generated/types";
import { tokenManager } from "../utils/jwtManager";

export const usePrivatePage = () => {
  const router = useRouter();
  const { setUser } = useAuthContext();
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
    if (!authId) {
      router.push("/login");
    } else {
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
