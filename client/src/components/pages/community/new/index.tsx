import React, { ReactNode, VFC } from "react";
import { SidebarTemplate } from "client/src/components/templates/sidebar-template/SidebarTemplate";
import { Box, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { CreateCommunityForm } from "client/src/components/organisms/form/create-community-form";
import Link from "next/link";
import { useRouter } from "next/router";

export const CommunityNewPage: React.VFC = () => {
  return (
    <SidebarTemplate variant="default">
      <Box maxW="870px" mx="auto" pt="70px">
        <Heading as="h1" fontSize="28px">
          コミュニティを作成する
        </Heading>
        <Text mt="14px" mb="22px">
          <NavLink step={1}>① 基本</NavLink> -{" "}
          <NavLink step={2}>② 画像</NavLink> -{" "}
          <NavLink step={3}>③ カテゴリ</NavLink> -{" "}
          <NavLink step={4}>④ 本文</NavLink>
        </Text>

        <CreateCommunityForm />
      </Box>
    </SidebarTemplate>
  );
};

type Props = {
  children: ReactNode;
  step: number;
};

const NavLink: VFC<Props> = ({ children, step }) => {
  const router = useRouter();
  const isCurrent = router.asPath === `/community/new?step=${step}`;

  return (
    <Link href={{ pathname: "/community/new", query: { step } }}>
      <ChakraLink color={isCurrent ? "blue.400" : "blackAlpha"}>
        {children}
      </ChakraLink>
    </Link>
  );
};
