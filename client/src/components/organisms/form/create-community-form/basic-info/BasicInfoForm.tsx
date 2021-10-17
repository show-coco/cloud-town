import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Card } from "../base/Card";
import { Body } from "../base/Body";
import { Footer } from "../base/Footer";
import { UseFormReturn } from "react-hook-form";
import { REQUIRED_MSG } from "client/src/utils/constants";
import { FormLabel } from "client/src/components/elements/form-label/FormLabel";
import { CreateCommunityFormData } from "..";

type Props = UseFormReturn<CreateCommunityFormData> & {
  moveStep: (step: number) => void;
};

export type BasicInfoValues = {
  name: string;
  title: string;
  slug: string;
};

export const BasicInfoForm: VFC<Props> = ({
  formState: { errors },
  register,
  handleSubmit,
  moveStep,
}) => {
  return (
    <Card title="基本情報">
      <form>
        <Body>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel isRequired>コミュニティ名</FormLabel>
            <Input
              placeholder="Community Name"
              {...register("name", {
                required: REQUIRED_MSG,
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt="40px" isInvalid={!!errors.title}>
            <FormLabel isRequired>募集タイトル</FormLabel>
            <Input
              placeholder="Title"
              {...register("title", {
                required: REQUIRED_MSG,
              })}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt="40px" isInvalid={!!errors.slug}>
            <FormLabel isRequired>コミュニティID</FormLabel>
            <Input
              placeholder="community-id"
              {...register("slug", {
                required: REQUIRED_MSG,
              })}
            />
            <FormErrorMessage>{errors.slug?.message}</FormErrorMessage>
          </FormControl>
        </Body>

        <Footer>
          <Button
            w="140px"
            colorScheme="blue"
            onClick={handleSubmit(() => moveStep(2))}
          >
            次へ
          </Button>
        </Footer>
      </form>
    </Card>
  );
};
