/*
 * Import
 */
import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Header } from "client/src/components/organisms/header";

/*
 * DOM
 */
export const CommunityNewPage: React.FC = () => {
  return (
    <Box bgColor="blue.50" minH="100vh">
      <Header />
      <Text fontSize="lg">コミュニティ作成ページ</Text>
    </Box>
  );
};
