import MaxWidthWrapper from "@/components/max-width-wrapper";
import { IllustrationViewUserAgent } from "../components/illustration-agent-view";
import { MultiStepForm } from "./components/multi-step-form";

export default function Page() {
  return (
    <main className="flex flex-col flex-1 bg-white py-10">
      <MaxWidthWrapper className="grid grid-cols-2 gap-8">
        <IllustrationViewUserAgent />
        <MultiStepForm/>
      </MaxWidthWrapper>
    </main>
  );
}
