import { BellIcon, DragHandleIcon, InfoIcon } from "@chakra-ui/icons";
import { NavLink } from "client/src/components/atoms/nav-link/NavLink";
import React, { ComponentProps, VFC } from "react";
import { BaseSidebar } from "./Base";

type Props = Omit<ComponentProps<typeof BaseSidebar>, "footer">;

export const BaseLoginSidebar: VFC<Props> = ({ children, ...props }) => {
  return (
    <BaseSidebar
      footer={
        <>
          <NavLink href="/notification" icon={<BellIcon />}>
            通知
          </NavLink>
          <NavLink href="/account" icon={<InfoIcon />}>
            アカウント
          </NavLink>
          <NavLink href="/settings" icon={<DragHandleIcon />}>
            ログアウト
          </NavLink>
        </>
      }
      {...props}
    >
      {children}
    </BaseSidebar>
  );
};
