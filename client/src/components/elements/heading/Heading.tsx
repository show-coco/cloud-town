import { HeadingProps } from "@chakra-ui/react";
import { VFC } from "react";

type Props = HeadingProps;

export const Heading: VFC<Props> = ({ children, ...props }) => {
  return (
    <Heading color="heading.dark" colorScheme="blue" {...props}>
      {children}
    </Heading>
  );
};
