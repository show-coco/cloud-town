import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, FormControl, Textarea } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Card } from "../base/Card";
import { Footer } from "../base/Footer";

type Props = {
  onFinish: () => void;
  backStep: () => void;
};

export const BodyForm: VFC<Props> = ({ onFinish, backStep }) => {
  return (
    <Card title="本文">
      <form>
        <FormControl isRequired>
          <Textarea
            resize="none"
            minH="300px"
            placeholder="コミュニティについて書き下してみましょう。"
          />
        </FormControl>

        <Footer>
          <Button leftIcon={<ChevronLeftIcon />} onClick={backStep}>
            前へ
          </Button>
          <Button w="140px" colorScheme="blue" type="submit" onClick={onFinish}>
            作成
          </Button>
        </Footer>
      </form>
    </Card>
  );
};
