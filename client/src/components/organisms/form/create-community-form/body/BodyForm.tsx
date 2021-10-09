import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, FormControl, Textarea } from "@chakra-ui/react";
import React, { VFC } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateCommunityFormData } from "..";
import { Card } from "../base/Card";
import { Footer } from "../base/Footer";

type Props = UseFormReturn<CreateCommunityFormData> & {
  moveStep: (step: number) => void;
  onClick: () => void;
};

export const BodyForm: VFC<Props> = ({ register, moveStep, onClick }) => {
  return (
    <Card title="本文">
      <form>
        <FormControl isRequired>
          <Textarea
            resize="none"
            minH="300px"
            placeholder="コミュニティについて書き下してみましょう。"
            {...register("body")}
          />
        </FormControl>

        <Footer>
          <Button leftIcon={<ChevronLeftIcon />} onClick={() => moveStep(3)}>
            前へ
          </Button>
          <Button w="140px" colorScheme="blue" type="submit" onClick={onClick}>
            作成
          </Button>
        </Footer>
      </form>
    </Card>
  );
};
