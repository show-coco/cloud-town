import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Card } from "../base/Card";
import { Body } from "../base/Body";
import { Footer } from "../base/Footer";

type Props = {
  onFinish: () => void;
};

export const ImageForm: VFC<Props> = ({ onFinish }) => {
  return (
    <Card title="画像を設定（任意）">
      <form onSubmit={onFinish}>
        <Body>
          <FormControl>
            <FormLabel>ヘッダー画像</FormLabel>
          </FormControl>
        </Body>
        <Footer>
          <Button leftIcon={<ChevronLeftIcon />}>前へ</Button>
          <Button w="140px" colorScheme="blue" type="submit">
            次へ
          </Button>
        </Footer>
      </form>
    </Card>
  );
};
