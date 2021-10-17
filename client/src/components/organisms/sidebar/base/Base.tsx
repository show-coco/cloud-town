import { Link, StackProps, VStack } from "@chakra-ui/react";
import React, { ReactElement, ReactNode, VFC } from "react";
import Logo from "../../../../icons/logo.svg";
import NextLink from "next/link";

type Props = StackProps & {
  children: ReactNode;
  footer: ReactElement;
};

export const BaseSidebar: VFC<Props> = ({
  children,
  footer,
  ...stackProps
}) => {
  return (
    <VStack
      w="250px"
      minH="100vh"
      position="sticky"
      top="0"
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

      <VStack w="100%">{footer}</VStack>
    </VStack>
  );
};
