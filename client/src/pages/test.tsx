import { EventShareModal } from "client/src/components/molecules/EventShareModal";
import { Box, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { NextPage } from "next";

const Test: NextPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box>
      <Button onClick={onOpen}>イベントシェアモーダルがでます</Button>
      <EventShareModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Test;
