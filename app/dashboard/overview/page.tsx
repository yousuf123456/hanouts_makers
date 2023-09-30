import React from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { getAccessTokenFromCookies } from "@/app/utils/getAccessToken";

export default async function OverviewPage() {
  return (
    <Layout>
      <Container>
        <Heading>Overview</Heading>
      </Container>
    </Layout>
  );
}
