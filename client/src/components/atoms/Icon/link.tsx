import { Image } from "@chakra-ui/react";

type IconType = {
  width?: string;
  height?: string;
};

export const Link = ({ height = "20", width = "20" }: IconType) => {
  return <Image h={height} w={width} src="icon/link.svg" />;
};
