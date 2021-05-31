import {
  Box,
  Text,
  Flex,
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { memo } from "react";
import {
  Twitter,
  Link,
  Facebook,
  Linkdin,
} from "client/src/components/atoms/Icon";

type eventShareModalType = {
  isOpen: boolean;
  onClose: () => void;
};

export const EventShareModal = memo<{
  isOpen: boolean;
  onClose: () => void;
}>(function EventShareModal({ isOpen, onClose }: eventShareModalType) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="389px">
        <ModalCloseButton w="24px" h="24px" left="17" top="12px" />
        <ModalBody>
          <Box mt="25px" mx="auto" w="200px">
            <Text
              fontSize="20px"
              lineHeight="23px"
              color="#212121"
              fontWeight="bold"
            >
              イベントをシェアする
            </Text>
            <Flex
              mt="31px"
              mx="auto"
              flexDirection="column"
              alignItems="center"
            >
              {/* TODO:onClick時の挙動を入れる */}
              <Button
                h="28px"
                w="157px"
                mb="16px"
                borderRadius="6px"
                bg="#1DA1F2"
                color="#FFFFFF"
                fontSize="14px"
                lineHeight="16px"
                fontWeight="bold"
                leftIcon={<Twitter height="12px" width="12px" />}
              >
                Twitterにシェア
              </Button>
              <Button
                h="28px"
                w="157px"
                mb="16px"
                borderRadius="6px"
                bg="#4267B2"
                color="#FFFFFF"
                fontSize="14px"
                lineHeight="16px"
                fontWeight="bold"
                leftIcon={<Facebook height="12px" width="12px" />}
              >
                Facebookにシェア
              </Button>
              <Button
                h="28px"
                w="157px"
                mb="16px"
                borderRadius="6px"
                bg="#2867B2"
                color="#FFFFFF"
                fontSize="14px"
                lineHeight="16px"
                fontWeight="bold"
                leftIcon={<Linkdin height="12px" width="12px" />}
              >
                Linkdinにシェア
              </Button>
              <Button
                h="28px"
                w="157px"
                mb="50px"
                borderRadius="6px"
                bg="#222120"
                color="#FFFFFF"
                fontSize="14px"
                lineHeight="16px"
                fontWeight="bold"
                leftIcon={<Link height="13px" width="13px" />}
              >
                リンクをコピー
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
