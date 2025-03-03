import React from "react";
import { Layout } from "../components/Layout";
import { WithPageId } from "../components/WithPageId";
import { Page } from "./components/Page";

interface SearchParams {
  pageId: string;
}
export default function page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <WithPageId pageId={searchParams.pageId}>
      <Layout className="gap-0 px-0 py-0">
        <Page pageId={searchParams.pageId} />
      </Layout>
    </WithPageId>
  );
}
