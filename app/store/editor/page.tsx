import React from "react";
import { Layout } from "../components/Layout";
import { Heading } from "../components/Heading";
import { Editor } from "./components/Editor";
import { WithPageId } from "../components/WithPageId";

interface SearchParams {
  pageId: string;
}

export default function StorePageEditorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <WithPageId pageId={searchParams.pageId}>
      <Layout>
        <div className="flex flex-col gap-8 pb-16">
          <Heading>Store Editor</Heading>

          <Editor pageId={searchParams.pageId} />
        </div>
      </Layout>
    </WithPageId>
  );
}
