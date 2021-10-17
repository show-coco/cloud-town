import { Box, Heading } from "@chakra-ui/react";
import React, { ReactNode, VFC } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export const Card: VFC<Props> = ({ children, title }) => {
  return (
    <Box boxShadow="md" maxW="870px" bgColor="white" borderRadius="md" p="23px">
      <Heading as="h2" textAlign="center" fontSize="16px" mb="50px">
        {title}
      </Heading>

      {children}
    </Box>
  );
};
