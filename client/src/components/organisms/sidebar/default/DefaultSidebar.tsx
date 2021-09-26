import { SearchIcon } from "@chakra-ui/icons";
import { Avatar, Divider, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "client/src/components/atoms/nav-link/NavLink";
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
      <VStack w="100%">
        <Text textColor="gray.600" fontSize="sm" w="100%" pl="20px" pt="15px">
          所属コミュニティ
        </Text>
        {user?.communities?.map((community) => (
          <NavLink
            key={community.id}
            icon={
              <Avatar
                src={community?.iconUrl}
                h="100%"
                w="100%"
                borderRadius="md"
              />
            }
            href={`/community/${community.slug}`}
          >
            {community.name}
          </NavLink>
        ))}
      </VStack>
    </BaseLoginSidebar>
  );
};
