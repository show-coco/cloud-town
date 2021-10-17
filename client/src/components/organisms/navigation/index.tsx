/*
 * Import
 */
import React from "react";
import Link from "next/link";
import { Box, Spacer } from "@chakra-ui/layout";
import { UserMenu } from "client/src/components/elements/user-menu";
import { Select } from "client/src/components/elements/select";
import { TypeUserMenu } from "client/src/utils/types";
import styles from "./style.module.scss";

/*
 * Types
 */
export type Props = {
  userMenu: TypeUserMenu;
  selectValue: string;
  handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  isDisplayPc: boolean;
};

/*
 * DOM
 */
const Component: React.VFC<Props> = (props) => (
  <Box
    display={{ base: "block", lg: "flex" }}
    alignItems={{ base: "normal", md: "center" }}
    flexGrow={1}
    justifyContent="space-between"
  >
    <Box>
      <nav>
        <ul
          className={
            props.isDisplayPc ? styles.navigation_menu : styles.navigation_modal
          }
        >
          <li>
            <Link href="/">
              <a className={styles.card}>さがす</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className={styles.card}>コミュニティをつくる</a>
            </Link>
          </li>
        </ul>
      </nav>
    </Box>

    <Spacer />

    <Box
      display={{ base: "block", lg: "flex" }}
      alignItems={{ base: "normal", md: "center" }}
    >
      <Select
        value={props.selectValue}
        onChange={props.handleSelectChange}
        placeholder="コミュニティを選択"
        py={{ base: "15px", lg: "0" }}
        backgroundColor={{ base: "gray.200", lg: "transparent" }}
      >
        <option value="コミュニティ 1">コミュニティ 1</option>
        <option value="コミュニティ 2">コミュニティ 2</option>
        <option value="コミュニティ 3">コミュニティ 3</option>
      </Select>

      <Box ml={{ base: "0", lg: "15px" }}>
        <UserMenu
          items={props.userMenu.items}
          image={props.userMenu.image}
          name={props.userMenu.name}
          job={props.userMenu.job}
        />
      </Box>
    </Box>
  </Box>
);

export const Navigation = Component;
