import React from "react";
import { SidebarTemplate } from "client/src/components/templates/sidebar-template/SidebarTemplate";
import { Box, Heading, Text } from "@chakra-ui/react";
import { CreateCommunityForm } from "client/src/components/organisms/form/create-community-form";

export const CommunityNewPage: React.VFC = () => {
  return (
    <SidebarTemplate variant="default">
      <Box maxW="870px" mx="auto" pt="70px">
        <Heading as="h1" fontSize="28px">
          コミュニティを作成する
        </Heading>
        <Text mt="14px" mb="22px">
          ① 基本 - ② 画像 - ③ カテゴリ - ④ プラン - ⑤ 本文 - ⑥ 本人確認
        </Text>

        <CreateCommunityForm />
      </Box>
    </SidebarTemplate>
  );
};
