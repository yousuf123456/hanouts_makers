import React from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";

export default async function OverviewPage() {
  return (
    <Layout>
      <Container>
        <Heading>Overview</Heading>
      </Container>
    </Layout>
  );
}
