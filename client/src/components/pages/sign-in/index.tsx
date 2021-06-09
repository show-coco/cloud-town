import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Link as ChakraLink } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const SignInPage = () => {
  return (
    <Box bgColor="blue.50" minH="100vh">
      <Flex
        className="container"
        alignItems="center"
        h="100vh"
        justifyContent="space-around"
      >
        <Flex className="left">
          <Box>
            <Heading as="h1" color="blackAlpha.900" mb={5}>
              Welcome to Atomic Community
            </Heading>
            <Heading as="h2" size="md" mb={12}>
              コミュニティを盛り上げるためのプラットフォーム
            </Heading>

            <Button colorScheme="blue" variant="outline" size="lg">
              コミュニティ一覧
            </Button>
          </Box>

          <Image src="/space-man.svg" width={100} height={150} quality={100} />
        </Flex>

        <Box className="right" textAlign="center">
          <Button
            colorScheme="blue"
            size="lg"
            px="10"
            py="8"
            boxShadow="2xl-blue"
            mb={10}
          >
            Login with Google
          </Button>

          <Text fontSize="lg">
            <Link href="#">
              <ChakraLink color="blue.400">利用規約</ChakraLink>
            </Link>
            に同意した上でログインしてください
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
