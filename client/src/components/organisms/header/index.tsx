/*
 * Import
 */
import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  Container as ChakraContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { Navigation } from "client/src/components/organisms/navigation";
import { useDisclosure } from "@chakra-ui/hooks";
import { HamburgerIcon } from "@chakra-ui/icons";
import { TypeUserMenu } from "client/src/utils/types";
import theme from "client/src/config/theme";

/*
 * Types
 */
export type Props = {
  userMenu: TypeUserMenu;
  selectValue: string;
  handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  isDisplayPc: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  mounted: boolean;
};

/*
 * DOM
 */
const Component: React.VFC<Props> = (props) => (
  <Box bgColor="white">
    <ChakraContainer maxW="container.xl">
      <Flex
        align="center"
        height={{ base: "40px", lg: "60px" }}
        justifyContent="space-between"
      >
        <Box>
          <Heading size="md" color="blue.400">
            Cloud Town
          </Heading>
        </Box>

        {/* スマホの場合のみハンバーガーメニューを表示 */}
        {props.mounted && props.isDisplayPc ? (
          <Navigation
            userMenu={props.userMenu}
            selectValue={props.selectValue}
            handleSelectChange={props.handleSelectChange}
            isDisplayPc={props.isDisplayPc}
          />
        ) : (
          <>
            <HamburgerIcon
              onClick={props.onOpen}
              cursor="pointer"
              aria-label="header menu"
              w="20px"
              h="20px"
              ml="10px"
            />
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
              <ModalOverlay backgroundColor="transparent" />
              <ModalContent
                m="15px"
                boxShadow="3px 3px 12px rgb(50 58 69 / 40%);"
              >
                <ModalCloseButton />
                <ModalBody>
                  <Navigation
                    userMenu={props.userMenu}
                    selectValue={props.selectValue}
                    handleSelectChange={props.handleSelectChange}
                    isDisplayPc={props.isDisplayPc}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}
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

  const [isDisplayPc] = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Component
      userMenu={userMenu}
      selectValue={selectValue}
      handleSelectChange={handleSelectChange}
      isDisplayPc={isDisplayPc}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      mounted={mounted}
    />
  );
};

export const Header = Container;
