import {
  Box,
  FormLabelProps,
  FormLabel as ChakraFormLabel,
} from "@chakra-ui/react";
import { VFC } from "react";

type Props = FormLabelProps & {
  isRequired?: boolean;
};

export const FormLabel: VFC<Props> = ({ children, isRequired, ...props }) => {
  return (
    <ChakraFormLabel {...props}>
      {children}
      {isRequired && (
        <Box display="inline" color="red" ml="4px">
          *
        </Box>
      )}
    </ChakraFormLabel>
  );
};
