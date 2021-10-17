import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { REQUIRED_MSG } from "client/src/utils/constants";
import React, { VFC } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateCommunityFormData } from "..";
import { Card } from "../base/Card";
import { Footer } from "../base/Footer";

type Props = UseFormReturn<CreateCommunityFormData> & {
  moveStep: (step: number) => void;
  onClick: () => void;
  loading: boolean;
};

export const BodyForm: VFC<Props> = ({
  loading,
  formState: { errors },
  register,
  moveStep,
  onClick,
}) => {
  return (
    <Card title="本文">
      <form>
        <FormControl isRequired isInvalid={!!errors.body}>
          <Textarea
            resize="none"
            minH="300px"
            placeholder="コミュニティについて書き下してみましょう。"
            {...register("body", {
              required: REQUIRED_MSG,
            })}
          />
          <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
        </FormControl>

        <Footer>
          <Button leftIcon={<ChevronLeftIcon />} onClick={() => moveStep(3)}>
            前へ
          </Button>
          <Button
            w="140px"
            colorScheme="blue"
            type="submit"
            onClick={onClick}
            isLoading={loading}
          >
            作成
          </Button>
        </Footer>
      </form>
    </Card>
  );
};
