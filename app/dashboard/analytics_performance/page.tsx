import React from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { AnalyticsAndPerformance } from "./components/AnalyticsAndPerformance";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import prisma from "../../libs/prismadb";

export default async function AnalyticsPage() {
  return (
    <Layout>
      <Container>
        <div className="flex flex-col gap-8">
          <Heading>Analytics and Performance</Heading>
          <AnalyticsAndPerformance
          // storeId={currentVendor?.store?.id as string}
          />
        </div>
      </Container>
    </Layout>
  );
}
