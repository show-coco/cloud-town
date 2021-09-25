import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Divider } from "@chakra-ui/react";
import { NavLink } from "../../../atoms/nav-link/NavLink";
import React, { VFC } from "react";
import { BaseGuestSidebar } from "../base/BaseGuestSidebar";
import Link from "next/link";

export const DefaultGuestSidebar: VFC = () => {
  return (
    <BaseGuestSidebar>
      <NavLink href="/community/search" icon={<SearchIcon />}>
        コミュニティを探す
      </NavLink>
      <Divider borderColor="border.light" />
      <Box mt="10px" w="90%" mx="auto">
        <Link href="/login">
          <Button colorScheme="blue" w="100%" mt="20px">
            ログイン
          </Button>
        </Link>
      </Box>
    </BaseGuestSidebar>
  );
};
