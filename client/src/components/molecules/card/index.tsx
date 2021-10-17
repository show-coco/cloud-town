/*
 * Import
 */
import Image from "next/image";
import React, { VFC } from "react";
import {
  Heading,
  Box,
  Text,
  Stack,
  Divider,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import styles from "./style.module.scss";
/*
 * todo propsの型定義
 */
// export type Props = {};

const Component: VFC = () => (
  <Box
    maxW={"320px"}
    w={"full"}
    bg={useColorModeValue("white", "gray.900")}
    boxShadow={"2xl"}
    rounded={"xl"}
    p={2}
    textAlign={"center"}
  >
    <Image
      src={
        "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
      }
      className={styles.image}
      alt={"コミュニティ画像"}
      height="130px"
      width="305px"
    />

    <Heading fontSize={"2xl"} fontFamily={"body"}>
      Timo Heihe
    </Heading>

    <Text
      fontSize={"sm"}
      textAlign="left"
      py={1}
      color={useColorModeValue("gray.700", "gray.400")}
    >
      React, Typescript, GraphQL, アーキテクチャ,
      設計など、さまざまなことを一緒に学習して...
    </Text>

    <Stack justifyContent="center" direction={"row"} spacing="0px">
      <Badge bg="#fff" fontWeight={"400"} color="#1DA1F2">
        #Hasura
      </Badge>
      <Badge bg="#fff" fontWeight={"400"} color="#1DA1F2">
        #GraphQL
      </Badge>
      <Badge bg="#fff" fontWeight={"400"} color="#1DA1F2">
        #TypeScript
      </Badge>
    </Stack>
    <Divider py="3" />

    <Stack
      justifyContent="space-between"
      direction={"row"}
      spacing="0px"
      pt="11px"
    >
      <Box py={1} textAlign={"center"} w="20">
        <Text bg="#fff" fontWeight="bold" color="#4C6FFF">
          500人
        </Text>
        <Text fontSize={"small"} bg="#fff" color="#425466">
          現在の人数
        </Text>
      </Box>
      <Box py={1} textAlign={"center"} px="10px" w="20">
        <Text bg="#fff" fontWeight="bold" color="#4C6FFF">
          無料
        </Text>
        <Text fontSize="small" bg="#fff" color="#425466">
          最低価格
        </Text>
      </Box>
      <Box py={1} textAlign={"center"} px="10px" w="20">
        <Text bg="#fff" fontWeight="bold" color="#4C6FFF">
          なし
        </Text>
        <Text fontSize={"small"} bg="#fff" color="#425466">
          申請
        </Text>
      </Box>
    </Stack>
  </Box>
);

export const Card = Component;