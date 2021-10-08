import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Card } from "../base/Card";
import { Body } from "../base/Body";
import { Footer } from "../base/Footer";
import ImageCropper from "client/src/components/elements/image-cropper/ImageCropper";
import { useImageController } from "client/src/hooks/useImageController";
import { ImageSelector } from "client/src/components/elements/image-selector/ImageSelector";
import { ImageDisplayer } from "client/src/components/elements/image-displayer/ImageDisplayer";

type Props = {
  onFinish: () => void;
  backStep: () => void;
};

export const ImageForm: VFC<Props> = ({ onFinish, backStep }) => {
  const {
    isOpen: headerModalIsOpen,
    imageBlob: headerBlob,
    onClose: onHeaderModalClose,
    onFileChange: onHeaderChange,
    onSave: onHeaderSave,
    onFileRemove: onHeaderRemove,
  } = useImageController();
  const {
    isOpen: iconModalIsOpen,
    imageBlob: iconBlob,
    onClose: onIconModalClose,
    onFileChange: onIconChange,
    onSave: onIconSave,
    onFileRemove: onIconRemove,
  } = useImageController();

  return (
    <>
      <Card title="画像を設定（任意）">
        <form>
          <Body>
            <FormControl mb="24px">
              <FormLabel>ヘッダー画像</FormLabel>
              {headerBlob ? (
                <ImageDisplayer
                  src={headerBlob}
                  width="100%"
                  height="100%"
                  onFileRemove={onHeaderRemove}
                />
              ) : (
                <ImageSelector onChange={onHeaderChange} />
              )}
            </FormControl>

            <FormControl>
              <FormLabel>アイコン画像</FormLabel>
              {iconBlob ? (
                <ImageDisplayer
                  src={iconBlob}
                  width="50px"
                  height="50px"
                  onFileRemove={onIconRemove}
                />
              ) : (
                <ImageSelector
                  onChange={onIconChange}
                  variant="icon"
                  width="50px"
                />
              )}
            </FormControl>
          </Body>

          <Footer>
            <Button leftIcon={<ChevronLeftIcon />} onClick={backStep}>
              前へ
            </Button>
            <Button
              w="140px"
              colorScheme="blue"
              onClick={onFinish}
              type="button"
            >
              次へ
            </Button>
          </Footer>
        </form>
      </Card>

      <ImageCropper
        isOpen={headerModalIsOpen}
        src={headerBlob}
        onClose={onHeaderModalClose}
        onSave={onHeaderSave}
      />
      <ImageCropper
        isOpen={iconModalIsOpen}
        src={iconBlob}
        onClose={onIconModalClose}
        onSave={onIconSave}
        canvasHeight={200}
        canvasWidth={200}
      />
    </>
  );
};
