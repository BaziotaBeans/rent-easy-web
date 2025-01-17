import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Header } from "./components/header";
import { Footer } from "@/components/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <Header />
        <MaxWidthWrapper className="h-full">{children}</MaxWidthWrapper>
      </main>
      <Footer />
    </div>
  );
}
