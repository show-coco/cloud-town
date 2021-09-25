import { Box, HStack } from "@chakra-ui/react";
import React, { ReactNode, VFC } from "react";
import { DeafultSidebar } from "../../organisms/sidebar/default/DefaultSidebar";
import { DefaultGuestSidebar } from "../../organisms/sidebar/default/GuestSidebar";

type Props = {
  children: ReactNode;
  variant?: "default" | "guest";
};

const sidebars = {
  default: <DeafultSidebar />,
  guest: <DefaultGuestSidebar />,
};

export const SidebarTemplate: VFC<Props> = ({
  children,
  variant = "default",
}) => {
  return (
    <HStack bgColor="#F3F5FA" p="0">
      {sidebars[variant]}
      <Box flex="1" minH="100vh">
        {children}
      </Box>
    </HStack>
  );
};
