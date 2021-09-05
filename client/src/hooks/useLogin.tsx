import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";
import { useUsersLazyQuery } from "../graphql/generated/types";
import { tokenManager } from "../utils/jwtManager";

type UseLoginReturn = {
  onLogin: () => void;
};

export const useLogin = (): UseLoginReturn => {
  const router = useRouter();
  const { setUser, auth } = useAuthContext();
  const toast = useToast();
  const [fetchUser] = useUsersLazyQuery({
    onCompleted: (data) => {
      const user = data.users[0];
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        slug: user.slug,
        authId: user.auth_id,
      });
      router.push("/");
    },
  });

  const onLogin = async () => {
    try {
      const { token, authId } = await auth.login();
      tokenManager.setToken(token, authId);
      await fetchUser({
        variables: {
          authId,
        },
      });
    } catch (error) {
      toast({
        title: "ログインに失敗しました。再度やり直してください。",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  return {
    onLogin,
  };
};
