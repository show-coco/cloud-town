import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

export class FirebaseStorageAdapter {
  storage: FirebaseStorage;

  constructor() {
    this.storage = getStorage();
  }

  async storeImage(file: File | Blob, name: string): Promise<string> {
    const imageRef = ref(this.storage, `image/${name}`);
    const res = await uploadBytes(imageRef, file);
    return getDownloadURL(res.ref);
  }
}
