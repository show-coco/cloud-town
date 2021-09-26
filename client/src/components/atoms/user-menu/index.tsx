/*
 * Import
 */
import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TypeUserMenu } from "client/src/utils/types";

/*
 * DOM
 */
const Component: React.VFC<TypeUserMenu> = (props) => (
  <Menu>
    <MenuButton p={2}>
      <Flex alignItems="center">
        <Avatar h="38px" w="38px" name={props.name} src={props.image} />
        <Box ml="15px" textAlign="left">
          <Text fontSize="sm" fontWeight="bold">
            {props.name}
          </Text>
          <Text fontSize="10px" color="#949494">
            {props.job}
          </Text>
        </Box>
        <ChevronDownIcon w="20px" h="20px" ml="10px" />
      </Flex>
    </MenuButton>
    <MenuList>
      {props.items.map((item, index) => (
        <MenuItem key={index}>{item}</MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export const UserMenu = Component;
