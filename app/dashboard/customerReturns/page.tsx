import React from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { CustomerReturns } from "./components/CustomerReturns";

export default async function CustomerReturnsPage() {
  return (
    <Layout>
      <Container>
        <div className="flex flex-col gap-8">
          <Heading>Customer Returns</Heading>

          <CustomerReturns />
        </div>
      </Container>
    </Layout>
  );
}
