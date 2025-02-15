"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { PaymentMethodBox } from "./components/payment-method-box";
import { PropertyResume } from "./components/property-resume";
import { useProperty } from "@/services/hooks/use-property";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const { id } = params;

  const { data, isLoading } = useProperty(String(id));

  const handleBack = () => {
    router.back();
  };

  console.log(data);

  return (
    <main className="h-full">
      <MaxWidthWrapper className="flex flex-col gap-10 py-6">
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={handleBack}
            className="hover:bg-white h-9 w-9 flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={2.1} />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Escolha sua forma de pagamento
          </h1>
        </div>

        {isLoading ? (
          <div className="flex items-start gap-6">
            <Skeleton className="rounded-xl w-full h-[326px]" />
            <Skeleton className="max-w-[380px] w-full h-[500px] rounded-xl" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-start gap-6 space-y-6 md:space-y-0">
            <PaymentMethodBox />

            <PropertyResume data={data!} />
          </div>
        )}
      </MaxWidthWrapper>
    </main>
  );
}
