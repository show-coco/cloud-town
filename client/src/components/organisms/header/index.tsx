/*
 * Import
 */
import React from "react";
import Link from "next/link";
import { Box, Flex, Spacer, Heading } from "@chakra-ui/layout";
import { Container as ChakraContainer } from "@chakra-ui/react";
import { Select } from "client/src/components/atoms/select";
import { UserMenu } from "client/src/components/atoms/user-menu";
import { TypeUserMenu } from "client/src/utils/types";
import styles from "./style.module.scss";

/*
 * Types
 */
export type Props = {
  userMenu: TypeUserMenu;
  selectValue: string;
  handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
};

/*
 * DOM
 */
const Component: React.VFC<Props> = (props) => (
  <Box bgColor="white" height="60px">
    <ChakraContainer maxW="container.xl">
      <Flex align="center">
        <Box>
          <Heading size="md" color="blue.400">
            Cloud Town
          </Heading>
        </Box>

        <Box>
          <ul className={styles.header_menu}>
            <li>
              <Link href="/" passHref>
                <a className={styles.card}>さがす</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a className={styles.card}>コミュニティをつくる</a>
              </Link>
            </li>
          </ul>
        </Box>

        <Spacer />

        <Flex align="center">
          <Select
            value={props.selectValue}
            onChange={props.handleSelectChange}
            placeholder="コミュニティを選択"
          >
            <option value="コミュニティ 1">コミュニティ 1</option>
            <option value="コミュニティ 2">コミュニティ 2</option>
            <option value="コミュニティ 3">コミュニティ 3</option>
          </Select>

          <Box ml="15px">
            <UserMenu
              items={props.userMenu.items}
              image={props.userMenu.image}
              name={props.userMenu.name}
              job={props.userMenu.job}
            />
          </Box>
        </Flex>
      </Flex>
    </ChakraContainer>
  </Box>
);

/*
 * Container
 */
const Container: React.VFC = () => {
  const userMenu = {
    items: ["user menu1", "user menu2", "user menu3"],
    image: "https://bit.ly/dan-abramov",
    name: "Nick Jonson",
    job: "Web Developer",
  };

  const [selectValue, setSelectValue] = React.useState("");
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  return (
    <Component
      userMenu={userMenu}
      selectValue={selectValue}
      handleSelectChange={handleSelectChange}
    />
  );
};

export const Header = Container;
