import { useRouter } from "next/router";
import { useEffect } from "react";
import { jwtManager } from "../utils/jwtManager";

export default function Page() {
  const router = useRouter();
  const token = router.query.token;

  useEffect(() => {
    if (token) {
      jwtManager.setJwt(token.toString());
      router.push("/");
    } else {
      router.push("/sign-in");
    }
  }, [router, token]);

  return <div>Authenticated successfully.</div>;
}
