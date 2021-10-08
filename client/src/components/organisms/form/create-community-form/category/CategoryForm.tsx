import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useCategoriesQuery } from "client/src/graphql/generated/types";
import React, { VFC } from "react";
import { Body } from "../base/Body";
import { Card } from "../base/Card";
import { Footer } from "../base/Footer";

type Props = {
  onFinish: () => void;
  backStep: () => void;
};

export const CategoryForm: VFC<Props> = ({ onFinish, backStep }) => {
  const { data } = useCategoriesQuery();

  return (
    <Card title="カテゴリとハッシュタグを設定">
      <form>
        <Body>
          <FormControl isRequired>
            <FormLabel>カテゴリ</FormLabel>
            <Select>
              {data?.category.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt="40px">
            <FormLabel>ハッシュタグ</FormLabel>
            <Input
              placeholder="#TypeScript #初心者歓迎"
              autoComplete="hashtag"
            />
          </FormControl>
        </Body>

        <Footer>
          <Button leftIcon={<ChevronLeftIcon />} onClick={backStep}>
            前へ
          </Button>
          <Button w="140px" colorScheme="blue" type="submit" onClick={onFinish}>
            次へ
          </Button>
        </Footer>
      </form>
    </Card>
  );
};
