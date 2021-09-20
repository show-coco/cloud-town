import { SearchIcon } from "@chakra-ui/icons";
import { Avatar, Divider, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "client/src/components/atoms/nav-link/NavLink";
import { useAuthContext } from "client/src/context/AuthContext";
import { useUserQuery } from "client/src/graphql/generated/types";
import React, { VFC } from "react";
import { BaseSidebar } from "../Base";

export const DeafultSidebar: VFC = () => {
  const { user } = useAuthContext();
  const { data } = useUserQuery({
    variables: {
      authId: user?.authId || "",
    },
  });

  const communities = data?.users[0].community_members.map((member) => {
    return member.community;
  });

  return (
    <BaseSidebar>
      <NavLink href="/community/search" icon={<SearchIcon />}>
        コミュニティを探す
      </NavLink>
      <Divider borderColor="border.light" />
      <VStack w="100%">
        <Text textColor="gray.600" fontSize="sm" w="100%" pl="20px" pt="15px">
          所属コミュニティ
        </Text>
        {communities?.map((community) => (
          <NavLink
            key={community.id}
            icon={
              <Avatar
                src={community.icon_url || undefined}
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
    </BaseSidebar>
  );
};
