import React from "react";
import { Layout } from "../../components/Layout";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Orders } from "./components/Orders";

export default async function OrdersListPage() {
  return (
    <Layout>
      <Container>
        <div className="flex flex-col gap-8">
          <Heading>Orders List</Heading>

          <Orders />
        </div>
      </Container>
    </Layout>
  );
}
