import { Skeleton, VStack } from "@chakra-ui/react";
import React, { VFC } from "react";
import { BaseSidebar } from "../base/Base";

export const LoadingSidebar: VFC = () => {
  return (
    <BaseSidebar
      footer={
        <VStack w="90%" mb="20px" gap="20px" alignItems="flex-start">
          <Skeleton height="20px" w="90%" />
          <Skeleton height="20px" w="70%" />
          <Skeleton height="20px" w="80%" />
        </VStack>
      }
    >
      <VStack w="90%" alignItems="flex-start">
        <Skeleton height="20px" w="50%" />
        <Skeleton height="20px" w="90%" />
        <Skeleton height="20px" w="30%" />
        <Skeleton height="20px" w="70%" />
      </VStack>
    </BaseSidebar>
  );
};
