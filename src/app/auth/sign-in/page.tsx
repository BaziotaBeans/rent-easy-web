import MaxWidthWrapper from "@/components/max-width-wrapper";
import { IllustrationViewUserNormal } from "../sign-up/components/illustration-user-view";
import { SignInForm } from "./components/sign-in-form";

export default function Page() {
  return (
    <main className="flex flex-col flex-1 bg-white py-10">
      <MaxWidthWrapper className="grid grid-cols-2 gap-8">
        <IllustrationViewUserNormal />
        <SignInForm/>
      </MaxWidthWrapper>
    </main>
  );
}
