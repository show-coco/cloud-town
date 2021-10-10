import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useCategoriesQuery } from "client/src/graphql/generated/types";
import { REQUIRED_MSG } from "client/src/utils/constants";
import React, { VFC } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateCommunityFormData } from "..";
import { Body } from "../base/Body";
import { Card } from "../base/Card";
import { Footer } from "../base/Footer";

type Props = UseFormReturn<CreateCommunityFormData> & {
  moveStep: (step: number) => void;
};

export type CategoryFormValues = {
  categoryId: string;
  hashtag: string;
};

export const CategoryForm: VFC<Props> = ({
  formState: { errors },
  register,
  handleSubmit,
  moveStep,
}) => {
  const { data, error } = useCategoriesQuery();

  if (error) console.error(error);

  return (
    <Card title="カテゴリとハッシュタグを設定">
      <form>
        <Body>
          <FormControl isRequired isInvalid={!!errors.categoryId}>
            <FormLabel>カテゴリ</FormLabel>
            <Select
              {...register("categoryId", {
                required: REQUIRED_MSG,
              })}
            >
              {data?.category.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.categoryId?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt="40px">
            <FormLabel>ハッシュタグ</FormLabel>
            <Input
              placeholder="#TypeScript #初心者歓迎"
              autoComplete="hashtag"
              {...register("hashtag")}
            />
          </FormControl>
        </Body>

        <Footer>
          <Button leftIcon={<ChevronLeftIcon />} onClick={() => moveStep(2)}>
            前へ
          </Button>
          <Button
            w="140px"
            colorScheme="blue"
            type="submit"
            onClick={handleSubmit(() => moveStep(4))}
          >
            次へ
          </Button>
        </Footer>
      </form>
    </Card>
  );
};
