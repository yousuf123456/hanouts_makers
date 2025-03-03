import React from "react";
import { Layout } from "../components/Layout";
import { Heading } from "../components/Heading";
import { Pages } from "./components/Pages";

export default async function StorePagesPage() {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <Heading>Store Pages</Heading>

        <Pages />
      </div>
    </Layout>
  );
}
