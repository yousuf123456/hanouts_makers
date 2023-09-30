import React from "react";

import { Layout } from "../../components/Layout";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Reviews } from "./components/Reviews";

export default async function ReviewsListingPage() {
  return (
    <Layout>
      <Container>
        <div className="flex flex-col gap-8">
          <Heading>Your Reviews</Heading>

          <div className="flex w-full justify-center">
            <Reviews />
          </div>
        </div>
      </Container>
    </Layout>
  );
}
