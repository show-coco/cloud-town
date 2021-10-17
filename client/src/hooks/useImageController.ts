import { useDisclosure } from "@chakra-ui/react";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

export type UseImageControllerRetunrs = {
  isOpen: boolean;
  imageBlob?: string;
  image?: File;
  blob?: Blob;
  onClose: () => void;
  onFileRemove: MouseEventHandler<HTMLButtonElement>;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  onSave: (blobObj: Blob) => void;
};

export const useImageController = (
  defaultImageBlob?: string
): UseImageControllerRetunrs => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [blob, setBlob] = useState<Blob>();
  const [imageBlob, setImageBlob] = useState(defaultImageBlob);
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState<File>();

  const onFileRemove: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setImageBlob("");
    setImage(undefined);
  };

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    const blob = URL.createObjectURL(file);
    setImageName(file?.name || "");
    setImageBlob(blob);
    onOpen();
  };

  const onSave = (blobObj: Blob) => {
    const blob = URL.createObjectURL(blobObj);
    console.log(blob, blobObj);
    setImageBlob(blob);
    setBlob(blobObj);

    const files = new File([blob], imageName);
    setImage(files);
    onClose();
  };

  return {
    isOpen,
    imageBlob,
    image,
    blob,
    onClose,
    onFileRemove,
    onFileChange,
    onSave,
  } as const;
};
