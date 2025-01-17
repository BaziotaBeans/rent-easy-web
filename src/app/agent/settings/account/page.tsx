"use client";

import ContentSection from "../components/content-section";
import { AccountForm } from "./components/account-form";

export default function page() {
  return (
    <ContentSection title="Conta" desc="Actualiza os dados da conta relativo ao acesso.">
      <AccountForm />
    </ContentSection>
  );
}
