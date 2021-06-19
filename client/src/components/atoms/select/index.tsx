/*
 * Import
 */
import React from "react";
import { Select as ChakraSelect } from "@chakra-ui/select";

/*
 * Types
 */
export type Props = {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  placeholder: string;
  width?: number;
};

/*
 * DOM
 */
export const Component: React.FC<Props> = (props) => (
  <ChakraSelect
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
    width={props.width || 190}
    fontSize="15px"
    bg="white"
    borderColor="white"
    focusBorderColor="#E6EAEF"
    _hover={{ bg: "#F3F3F3", borderColor: "#F3F3F3" }}
  >
    {props.children}
  </ChakraSelect>
);

export const Select = Component;
