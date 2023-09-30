import React from "react";
import { Layout } from "../../components/Layout";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Section } from "./components/Section";
import { AddProductForm } from "./components/AddProductForm";

export default async function AddProductPage() {
  return (
    <Layout className=" overflow-x-visible">
      <Container className="bg-neutral-100">
        <div className="flex flex-col gap-8">
          <Section className="flex justify-center">
            <Heading>Add New Product</Heading>
          </Section>

          <AddProductForm />
        </div>
      </Container>
    </Layout>
  );
}
