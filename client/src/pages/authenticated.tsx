import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const token = router.query.token;

  useEffect(() => {
    if (token) {
      router.push("/");
    } else {
      router.push("/sign-in");
    }
  }, [router, token]);

  return <div>Authenticated successfully.</div>;
}
