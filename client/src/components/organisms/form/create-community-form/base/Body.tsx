import { Box } from "@chakra-ui/react";
import React, { ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const Body: VFC<Props> = ({ children }) => {
  return (
    <Box w="60%" mx="auto">
      {children}
    </Box>
  );
};
