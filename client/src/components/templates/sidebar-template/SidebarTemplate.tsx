import { Box, HStack } from "@chakra-ui/react";
import { useAuthContext } from "client/src/context/AuthContext";
import React, { ReactNode, VFC } from "react";
import { CommunitySidebar } from "../../organisms/sidebar/community/CommunitySidebar";
import { DefaultSidebar } from "../../organisms/sidebar/default/DefaultSidebar";
import { DefaultGuestSidebar } from "../../organisms/sidebar/default/GuestSidebar";
import { LoadingSidebar } from "../../organisms/sidebar/loading/LoadingSidebar";
import { SearchGuestSidebar } from "../../organisms/sidebar/search/SearchGuestSidebar";
import { SearchSidebar } from "../../organisms/sidebar/search/SearchSidebar";

type Variant = "default" | "search" | "community";

type Props = {
  children: ReactNode;
  variant?: Variant;
};

const sidebars = {
  default: {
    login: <DefaultSidebar />,
    guest: <DefaultGuestSidebar />,
  },
  search: {
    login: <SearchSidebar />,
    guest: <SearchGuestSidebar />,
  },
  community: <CommunitySidebar />,
};

const getSidebar = (
  variant: Variant,
  isAuthenticated: boolean,
  loading: boolean
) => {
  if (loading) return <LoadingSidebar />;

  const status = isAuthenticated ? "login" : "guest";

  return variant === "default" || variant === "search"
    ? sidebars[variant][status]
    : sidebars[variant];
};

export const SidebarTemplate: VFC<Props> = ({
  children,
  variant = "default",
}) => {
  const { isAuthenticated, loading } = useAuthContext();
  const sidebar = getSidebar(variant, isAuthenticated, loading);

  return (
    <HStack bgColor="#F3F5FA" p="0">
      {sidebar}
      <Box flex="1" minH="100vh">
        {children}
      </Box>
    </HStack>
  );
};
