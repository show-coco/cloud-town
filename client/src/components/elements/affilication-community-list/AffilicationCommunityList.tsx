import { VStack, Text, Avatar } from "@chakra-ui/react";
import { Community } from "client/src/context/AuthContext";
import React, { VFC } from "react";
import { NavLink } from "../nav-link/NavLink";

type Props = {
  communities: Community[];
};

export const AffilicationCommunityList: VFC<Props> = ({ communities }) => {
  return (
    <VStack w="100%">
      <Text textColor="gray.600" fontSize="sm" w="100%" pl="20px" pt="15px">
        所属コミュニティ
      </Text>
      {communities?.map((community) => (
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
  );
};
