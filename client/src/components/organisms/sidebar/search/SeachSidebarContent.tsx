import { SearchIcon } from "@chakra-ui/icons";
import { Box, Divider, FormLabel, Select } from "@chakra-ui/react";
import { NavLink } from "client/src/components/atoms/nav-link/NavLink";
import React, { VFC } from "react";

export const SearchSidebarContent: VFC = () => {
  return (
    <Box w="100%">
      <Box width="90%" mx="auto">
        <FormLabel>月額</FormLabel>
        <Select>
          <option>指定なし</option>
          <option>無料</option>
          <option>1~1000円</option>
          <option>1000~2000円</option>
          <option>2000~5000円</option>
          <option>5000~10000円</option>
          <option>10000以上</option>
        </Select>

        <FormLabel mt="20px">カテゴリ</FormLabel>
        <Select>
          <option>指定なし</option>
          <option>プログラミング</option>
          <option>ゲーム</option>
          <option>デザイン</option>
          <option>音楽</option>
          <option>チャレンジ</option>
          <option>写真</option>
          <option>ビジネス</option>
          <option>雑談</option>
          <option>その他</option>
        </Select>

        <FormLabel mt="20px">並べ替え</FormLabel>
        <Select mb="38px">
          <option>指定なし</option>
          <option>新着順</option>
          <option>人気順</option>
        </Select>
      </Box>

      <Divider borderColor="border.light" />

      <NavLink href="/community/search" icon={<SearchIcon />}>
        コミュニティを探す
      </NavLink>

      <Divider borderColor="border.light" />
    </Box>
  );
};
