import { useDisclosure } from "@chakra-ui/react";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

export const useImageController = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [imageBlob, setImageBlob] = useState("");
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
    setImageBlob(blob);

    const files = new File([blob], imageName);
    setImage(files);
    onClose();
  };

  return {
    isOpen,
    imageBlob,
    image,
    onClose,
    onFileRemove,
    onFileChange,
    onSave,
  } as const;
};
