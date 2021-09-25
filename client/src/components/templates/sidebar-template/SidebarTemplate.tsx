import { Box, HStack } from "@chakra-ui/react";
import React, { ReactNode, VFC } from "react";
import { DeafultSidebar } from "../../organisms/sidebar/default/DefaultSidebar";
import { DefaultGuestSidebar } from "../../organisms/sidebar/default/GuestSidebar";
import { SearchGuestSidebar } from "../../organisms/sidebar/search-sidebar/SearchGuestSidebar";
import { SearchSidebar } from "../../organisms/sidebar/search-sidebar/SearchSidebar";

type Props = {
  children: ReactNode;
  variant?: "default" | "search";
};

const sidebars = {
  default: {
    login: <DeafultSidebar />,
    guest: <DefaultGuestSidebar />,
  },
  search: {
    login: <SearchSidebar />,
    guest: <SearchGuestSidebar />,
  },
};

export const SidebarTemplate: VFC<Props> = ({
  children,
  variant = "default",
}) => {
  return (
    <HStack bgColor="#F3F5FA" p="0">
      {sidebars[variant]["login"]}
      <Box flex="1" minH="100vh">
        {children}
      </Box>
    </HStack>
  );
};
