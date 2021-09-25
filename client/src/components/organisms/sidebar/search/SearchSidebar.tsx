import React, { VFC } from "react";
import { BaseLoginSidebar } from "../base/BaseLoginSidebar";
import { SearchSidebarContent } from "./SeachSidebarContent";

export const SearchSidebar: VFC = () => {
  return (
    <BaseLoginSidebar>
      <SearchSidebarContent />
    </BaseLoginSidebar>
  );
};
