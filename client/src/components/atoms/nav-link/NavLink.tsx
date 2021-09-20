import { Center, Link, Text } from "@chakra-ui/react";
import React, { ReactElement, ReactNode, VFC } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
  icon: ReactElement;
  href: string;
};

export const NavLink: VFC<Props> = ({ children, icon, href }) => {
  const router = useRouter();

  const isCurrent = router.pathname === href;

  return (
    <NextLink href={href}>
      <Link
        w="100%"
        display="inline-flex"
        alignItems="center"
        h="50px"
        px="20px"
        fontWeight="bold"
        _hover={{ bgColor: "blackAlpha.100" }}
        borderLeft={isCurrent ? "2px" : undefined}
        borderColor={isCurrent ? "blue" : undefined}
        borderRadius="sm"
      >
        <Center
          display="inline-flex"
          mr="20px"
          color="gray.500"
          minW="24px"
          w="24px"
          h="24px"
        >
          {icon}
        </Center>
        <Text textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
          {children}
        </Text>
      </Link>
    </NextLink>
  );
};
