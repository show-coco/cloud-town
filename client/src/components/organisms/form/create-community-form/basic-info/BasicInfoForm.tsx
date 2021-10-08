import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Card } from "../base/Card";
import { Body } from "../base/Body";
import { Footer } from "../base/Footer";

type Props = {
  onFinish: () => void;
};

export const BasicInfoForm: VFC<Props> = ({ onFinish }) => {
  return (
    <Card title="基本情報">
      <form onSubmit={onFinish}>
        <Body>
          <FormControl isRequired>
            <FormLabel>コミュニティ名</FormLabel>
            <Input placeholder="Community Name" />
          </FormControl>

          <FormControl isRequired mt="40px">
            <FormLabel>募集タイトル</FormLabel>
            <Input placeholder="Title" />
          </FormControl>

          <FormControl isRequired mt="40px">
            <FormLabel>コミュニティID</FormLabel>
            <Input placeholder="community-id" />
          </FormControl>
        </Body>

        <Footer>
          <Button w="140px" colorScheme="blue" type="submit">
            次へ
          </Button>
        </Footer>
      </form>
    </Card>
  );
};
