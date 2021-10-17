import { Center, Text } from "@chakra-ui/react";
import { forwardRef, InputHTMLAttributes } from "react";
import ImageIcon from "../../../icons/image.svg";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "header" | "icon";
  width?: string;
};

export const ImageSelector = forwardRef<HTMLInputElement, Props>(
  function ImageSelector(
    { variant = "header", width = "100%", ...props },
    ref
  ) {
    return (
      <label>
        <input type="file" accept="image/*" ref={ref} hidden {...props} />
        <Center
          display="inline-flex"
          bgColor="gray.200"
          textColor="body.light"
          borderRadius="6px"
          cursor="pointer"
          width={width}
          _hover={{ bgColor: "gray.300" }}
          style={{
            aspectRatio: `${variant === "header" ? "295 / 130" : "1/ 1"}`,
          }}
        >
          <ImageIcon />
          {variant === "header" && <Text ml="8px">ヘッダー画像を選択</Text>}
        </Center>
      </label>
    );
  }
);
