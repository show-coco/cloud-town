import {
  BellIcon,
  DragHandleIcon,
  InfoIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { Link, StackProps, VStack } from "@chakra-ui/react";
import React, { ReactNode, VFC } from "react";
import { NavLink } from "../../atoms/nav-link/NavLink";
import Logo from "../../../icons/logo.svg";
import NextLink from "next/link";

type Props = StackProps & {
  children: ReactNode;
};

export const BaseSidebar: VFC<Props> = ({ children, ...stackProps }) => {
  return (
    <VStack
      w="250px"
      h="100vh"
      justifyContent="space-between"
      bgColor="white"
      {...stackProps}
    >
      <VStack w="100%">
        <NextLink href="/">
          <Link py="28px">
            <Logo />
          </Link>
        </NextLink>
        {children}
      </VStack>

      <VStack w="100%">
        <NavLink href="/notification" icon={<BellIcon />}>
          通知
        </NavLink>
        <NavLink href="/account" icon={<InfoIcon />}>
          アカウント
        </NavLink>
        <NavLink href="/settings" icon={<DragHandleIcon />}>
          ログアウト
        </NavLink>
      </VStack>
    </VStack>
  );
};
