import { InfoIcon } from "@chakra-ui/icons";
import { NavLink } from "client/src/components/atoms/nav-link/NavLink";
import React, { ComponentProps, VFC } from "react";
import { BaseSidebar } from "./Base";

type Props = Omit<ComponentProps<typeof BaseSidebar>, "footer">;

export const BaseGuestSidebar: VFC<Props> = ({ children, ...props }) => {
  return (
    <BaseSidebar
      footer={
        <>
          <NavLink href="/about" icon={<InfoIcon />}>
            Cloud Townについて
          </NavLink>
        </>
      }
      {...props}
    >
      {children}
    </BaseSidebar>
  );
};
