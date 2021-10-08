import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Textarea } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Card } from "../base/Card";
import { Footer } from "../base/Footer";

type Props = {
  onFinish: () => void;
};

export const BodyForm: VFC<Props> = ({ onFinish }) => {
  return (
    <Card title="本文">
      <form>
        <Textarea
          resize="none"
          minH="300px"
          placeholder="コミュニティについて書き下してみましょう。"
        />

        <Footer>
          <Button leftIcon={<ChevronLeftIcon />}>前へ</Button>
          <Button w="140px" colorScheme="blue" type="submit" onClick={onFinish}>
            次へ
          </Button>
        </Footer>
      </form>
    </Card>
  );
};
