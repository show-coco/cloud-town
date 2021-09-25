import { VFC } from "react";
import { SidebarTemplate } from "client/src/components/templates/sidebar-template/SidebarTemplate";
import { Heading } from "@chakra-ui/react";

const CommunitySearchPage: VFC = () => {
  return (
    <SidebarTemplate variant="search">
      <Heading as="h1">コミュニティを探す</Heading>
    </SidebarTemplate>
  );
};

export default CommunitySearchPage;
