import {
  NavButton,
  NavLink,
} from "client/src/components/elements/nav-link/NavLink";
import React, { ComponentProps, MouseEventHandler, VFC } from "react";
import { BaseSidebar } from "./Base";
import Logout from "../../../../icons/logout.svg";
import Person from "../../../../icons/person.svg";
import Bell from "../../../../icons/bell.svg";
import { useAuthContext } from "client/src/context/AuthContext";
import { tokenManager } from "client/src/utils/jwtManager";

type Props = Omit<ComponentProps<typeof BaseSidebar>, "footer">;

export const BaseLoginSidebar: VFC<Props> = ({ children, ...props }) => {
  const { setUser } = useAuthContext();

  const onLogout: MouseEventHandler<HTMLAnchorElement> = () => {
    setUser(undefined);
    tokenManager.clear();
  };

  return (
    <BaseSidebar
      footer={
        <>
          <NavLink href="/notification" icon={<Bell />}>
            通知
          </NavLink>
          <NavLink href="/account" icon={<Person />}>
            アカウント
          </NavLink>
          <NavButton icon={<Logout />} onClick={onLogout}>
            ログアウト
          </NavButton>
        </>
      }
      {...props}
    >
      {children}
    </BaseSidebar>
  );
};
