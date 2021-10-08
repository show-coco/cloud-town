import { Box, CloseButton } from "@chakra-ui/react";
import React, { ImgHTMLAttributes, VFC } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  onFileRemove: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "header" | "icon";
  width?: string;
  height?: string;
};

export const ImageDisplayer: VFC<Props> = ({
  onFileRemove,
  variant = "header",
  width,
  height,
  ...props
}) => {
  return (
    <Box
      position="relative"
      border="1px"
      borderRadius="6px"
      borderColor="gray.200"
      width="fit-content"
    >
      <CloseButton
        onClick={onFileRemove}
        position="absolute"
        right="1"
        top="1"
        width={variant === "icon" ? "100%" : undefined}
        height={variant === "icon" ? "100%" : undefined}
      />
      <img
        {...props}
        style={{
          aspectRatio: `${variant === "header" ? "295 / 130" : "1/ 1"}`,
          borderRadius: "6px",
          width,
          height,
        }}
      />
    </Box>
  );
};
