import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { ComponentProps, memo, VFC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useImageCrop } from "./useImageCrop";

type Props = Omit<ComponentProps<typeof Modal>, "children"> & {
  onSave: (blob: Blob) => void;
  src: string;
  canvasWidth?: number;
  canvasHeight?: number;
  maxZoomRatio?: number;
};

const ImageCropperWrapper: VFC<Props> = ({ ...props }) => (
  <DndProvider backend={HTML5Backend}>
    <ImageCropper {...props} />
  </DndProvider>
);

const ImageCropper: VFC<Props> = ({
  onSave,
  src,
  canvasWidth = 640,
  canvasHeight = 320,
  maxZoomRatio = 3,
  ...modalProps
}) => {
  const {
    isDragging,
    drag,
    drop,
    zoomedCordinate,
    image,
    imgRef,
    onScale,
    onCrop,
  } = useImageCrop({
    onSave,
    src,
    canvasHeight,
    canvasWidth,
    maxZoomRatio,
  });

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent maxW="fit-content">
        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          justifyContent="center"
        >
          <Box
            position="relative"
            ref={drop}
            width={canvasWidth}
            height={canvasHeight}
          >
            <Box
              ref={drag}
              data-dragging={isDragging}
              width={isDragging ? "100vw" : canvasWidth}
              height={isDragging ? "100vh" : canvasHeight}
              position="absolute"
              top="0"
              left="0"
              zIndex="99"
              cursor="move"
            ></Box>
            <Box
              width={canvasWidth}
              height={canvasHeight}
              overflow="hidden"
              bg="blackAlpha.50"
              style={{ aspectRatio: `${canvasWidth} / ${canvasHeight}` }}
            >
              <img
                src={src}
                style={{
                  display: "inline-block",
                  transform: `translate(${zoomedCordinate.x + image.x}px, ${
                    zoomedCordinate.y + image.y
                  }px)`,
                }}
                ref={imgRef}
              />
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Input
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={0}
            onChange={onScale}
            w="200px"
          />

          <HStack alignItems="center">
            <Button onClick={modalProps.onClose} variant="secondary">
              キャンセル
            </Button>
            <Button onClick={onCrop}>保存</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ImageCropperWrapper);
