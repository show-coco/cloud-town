import { SearchIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";
import { AffilicationCommunityList } from "client/src/components/elements/affilication-community-list/AffilicationCommunityList";
import { NavLink } from "client/src/components/elements/nav-link/NavLink";
import { useAuthContext } from "client/src/context/AuthContext";
import React, { VFC } from "react";
import { BaseLoginSidebar } from "../base/BaseLoginSidebar";

export const DefaultSidebar: VFC = () => {
  const { user } = useAuthContext();

  return (
    <BaseLoginSidebar>
      <NavLink href="/community/search" icon={<SearchIcon />}>
        コミュニティを探す
      </NavLink>
      <Divider borderColor="border.light" />
      <AffilicationCommunityList communities={user?.communities || []} />
    </BaseLoginSidebar>
  );
};
