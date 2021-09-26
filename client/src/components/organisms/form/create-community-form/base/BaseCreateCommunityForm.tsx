import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import React, { ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const BaseCreateCommunityForm: VFC<Props> = ({ children }) => {
  return (
    <Box boxShadow="md" maxW="870px" bgColor="white" borderRadius="md" p="23px">
      <Heading as="h2" textAlign="center" fontSize="16px">
        基本情報
      </Heading>

      {children}

      <HStack justifyContent="flex-end" w="90%" mt="60px">
        <Button leftIcon={<ChevronLeftIcon />}>前へ</Button>
        <Button w="140px" colorScheme="blue">
          次へ
        </Button>
      </HStack>
    </Box>
  );
};
