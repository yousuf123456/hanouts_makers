import React from "react";
import { Layout } from "../../components/Layout";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Products } from "./components/Products";
import { ProductListActions } from "./components/ProductListActions";

export default async function ProductsListPage() {
  return (
    <Layout>
      <Container>
        <div className="flex flex-col gap-8">
          <Heading>Products Listing</Heading>

          <div className="flex justify-center w-full">
            <Products />
          </div>
        </div>
      </Container>
    </Layout>
  );
}
