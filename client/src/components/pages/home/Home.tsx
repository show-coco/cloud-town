import { Box, Heading } from "@chakra-ui/react";
import { useAuthContext } from "client/src/context/AuthContext";
import React, { VFC } from "react";
import { SidebarTemplate } from "../../templates/sidebar-template/SidebarTemplate";

const HomePage: VFC = () => {
  const { user } = useAuthContext();

  return (
    <SidebarTemplate variant="default">
      <Box flex="1">
        <Heading as="h1">トップ</Heading>
        <div>Name: {user?.name}</div>

        <div>
          <p>Hello</p>
        </div>
      </Box>
    </SidebarTemplate>
  );
};

export default HomePage;
