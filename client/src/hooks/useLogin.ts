import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { mapToAuthUser, useAuthContext } from "../context/AuthContext";
import { useUserLazyQuery } from "../graphql/generated/types";
import { tokenManager } from "../utils/jwtManager";

type UseLoginReturn = {
  onLogin: () => void;
};

export const useLogin = (): UseLoginReturn => {
  const router = useRouter();
  const { setUser, auth } = useAuthContext();
  const toast = useToast();
  const [fetchUser] = useUserLazyQuery({
    onCompleted: (data) => {
      setUser(mapToAuthUser(data));
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
