import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { VFC } from "react";
import { BaseCreateCommunityForm } from "../base/BaseCreateCommunityForm";

export const BasicInfoForm: VFC = () => {
  return (
    <BaseCreateCommunityForm>
      <Box w="60%" mx="auto" mt="50px">
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
      </Box>
    </BaseCreateCommunityForm>
  );
};
