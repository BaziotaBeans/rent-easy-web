"use client";

import ContentSection from "../components/content-section";
import { BankForm } from "./components/bank-form";

export default function Page() {
  return (
    <ContentSection title="Dados Bancário" desc="Actualiza os dados bancários.">
      <BankForm />
    </ContentSection>
  );
}
