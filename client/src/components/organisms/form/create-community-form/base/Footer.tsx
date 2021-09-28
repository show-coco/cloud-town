import { HStack } from "@chakra-ui/react";
import React, { ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const Footer: VFC<Props> = ({ children }) => {
  return (
    <HStack justifyContent="flex-end" w="90%" mt="60px">
      {children}
    </HStack>
  );
};
