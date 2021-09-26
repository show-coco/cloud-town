import {
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "client/src/components/atoms/nav-link/NavLink";
import { useAuthContext } from "client/src/context/AuthContext";
import { useRouter } from "next/router";
import React, { VFC } from "react";
import { BaseLoginSidebar } from "../base/BaseLoginSidebar";
import HomeIcon from "../../../../icons/home.svg";
import MembersIcon from "../../../../icons/members.svg";
import SettingsIcon from "../../../../icons/settings.svg";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

export const CommunitySidebar: VFC = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const currentCommunity = user?.communities?.find(
    (community) => community.slug === router.query.slug
  );

  return (
    <BaseLoginSidebar>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="90%">
          <Text
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            textAlign="left"
          >
            {currentCommunity?.name}
          </Text>
        </MenuButton>
        <MenuList>
          {user?.communities?.map((community) => (
            <MenuItem
              key={community.id}
              onClick={() => {
                router.push(`/community/${community.slug}`);
              }}
            >
              {community.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <NavLink icon={<HomeIcon />} href={`/community/${router.query.slug}`}>
        ダッシュボード
      </NavLink>
      <NavLink
        icon={<MembersIcon />}
        href={`/community/${router.query.slug}/members`}
      >
        メンバー
      </NavLink>
      <NavLink
        icon={<SettingsIcon />}
        href={`/community/${router.query.slug}/settings`}
      >
        設定
      </NavLink>
      <Divider borderColor="border.light" />
      <Text textAlign="left" px="20px" w="100%">
        メッセージ
      </Text>
      {/* TODO: メッセージ一覧表示 */}
      <Divider borderColor="border.light" />
      <NavLink href="/community/search" icon={<SearchIcon />}>
        コミュニティを探す
      </NavLink>
    </BaseLoginSidebar>
  );
};
