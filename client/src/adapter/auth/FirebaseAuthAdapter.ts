import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import * as firebase from "firebase/app";
import "firebase/auth";
import { IAuthAdapter } from "./IAuthAdapter";

export class FirebaseAuthAdapter implements IAuthAdapter {
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FB_PJ_ID,
      storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FB_MSG_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FB_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
    };

    firebase.initializeApp(firebaseConfig);
  }

  async login(): Promise<{ authId: string; token: string }> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const idTokenResult = await result.user.getIdTokenResult();
    const uid = result.user.uid;
    const hasuraClaim = idTokenResult.claims["https://hasura.io/jwt/claims"];

    if (hasuraClaim) {
      const token = idTokenResult.token;
      console.log("Logged in with Google", token);
      return { token, authId: uid };
    } else {
      const db = getFirestore();
      const ref = await getDoc(doc(db, "user_meta", result.user.uid));
      const data = await ref.data();
      if (data) {
        const token = await result.user.getIdToken(true);
        console.log("Logged in with Google", token);
        return { token, authId: uid };
      }
    }

    throw new Error("Failed to log in");
  }

  logout(): void {
    const auth = getAuth();
    signOut(auth);
  }
}
