/*
 * Import
 */
import React from "react";
import { Select as ChakraSelect, SelectProps } from "@chakra-ui/react";

/*
 * DOM
 */
export const Component: React.VFC<SelectProps> = (props) => (
  <ChakraSelect
    width={props.width || 190}
    fontSize="15px"
    bg="white"
    borderColor="white"
    focusBorderColor="#E6EAEF"
    _hover={{ bg: "#F3F3F3", borderColor: "#F3F3F3" }}
    {...props}
  >
    {props.children}
  </ChakraSelect>
);

export const Select = Component;
