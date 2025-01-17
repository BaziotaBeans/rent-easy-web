import ContentSection from "../components/content-section";
import { PaymentDataTable } from "./components/payment-table";

export default function Page() {
  return (
    <ContentSection title="Pagamentos" desc="Lista dos seus pagamentos." widthClass="lg:max-w-full">
      <PaymentDataTable />
    </ContentSection>
  );
}

//PaymentDataTable
