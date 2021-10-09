import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Card } from "../base/Card";
import { Body } from "../base/Body";
import { Footer } from "../base/Footer";
import ImageCropper from "client/src/components/elements/image-cropper/ImageCropper";
import { UseImageControllerRetunrs } from "client/src/hooks/useImageController";
import { ImageSelector } from "client/src/components/elements/image-selector/ImageSelector";
import { ImageDisplayer } from "client/src/components/elements/image-displayer/ImageDisplayer";

type Props = {
  thumbnail: UseImageControllerRetunrs;
  icon: UseImageControllerRetunrs;
  moveStep: (step: number) => void;
};

export type ImageFormValues = {
  thumbnailBrob?: string;
  iconBlob?: string;
};

export const ImageForm: VFC<Props> = ({ thumbnail, icon, moveStep }) => {
  return (
    <>
      <Card title="画像を設定（任意）">
        <form>
          <Body>
            <FormControl mb="24px">
              <FormLabel>ヘッダー画像</FormLabel>
              {thumbnail.imageBlob ? (
                <ImageDisplayer
                  src={thumbnail.imageBlob}
                  width="100%"
                  height="100%"
                  onFileRemove={thumbnail.onFileRemove}
                />
              ) : (
                <ImageSelector onChange={thumbnail.onFileChange} />
              )}
            </FormControl>

            <FormControl>
              <FormLabel>アイコン画像</FormLabel>
              {icon.imageBlob ? (
                <ImageDisplayer
                  src={icon.imageBlob}
                  width="50px"
                  height="50px"
                  onFileRemove={icon.onFileRemove}
                />
              ) : (
                <ImageSelector
                  onChange={icon.onFileChange}
                  variant="icon"
                  width="50px"
                />
              )}
            </FormControl>
          </Body>

          <Footer>
            <Button leftIcon={<ChevronLeftIcon />} onClick={() => moveStep(1)}>
              前へ
            </Button>
            <Button
              w="140px"
              colorScheme="blue"
              onClick={() => moveStep(3)}
              type="button"
            >
              次へ
            </Button>
          </Footer>
        </form>
      </Card>

      <ImageCropper
        isOpen={thumbnail.isOpen}
        src={thumbnail.imageBlob || ""}
        onClose={thumbnail.onClose}
        onSave={thumbnail.onSave}
      />
      <ImageCropper
        isOpen={icon.isOpen}
        src={icon.imageBlob || ""}
        onClose={icon.onClose}
        onSave={icon.onSave}
        canvasHeight={200}
        canvasWidth={200}
      />
    </>
  );
};
