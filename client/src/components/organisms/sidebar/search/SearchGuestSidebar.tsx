import React, { VFC } from "react";
import { BaseGuestSidebar } from "../base/BaseGuestSidebar";
import { SearchSidebarContent } from "./SeachSidebarContent";

export const SearchGuestSidebar: VFC = () => {
  return (
    <BaseGuestSidebar>
      <SearchSidebarContent />
    </BaseGuestSidebar>
  );
};
