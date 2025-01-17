import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Header } from "./components/header";
import { Footer } from "@/components/footer";
import { SearchMapProvider } from "@/contexts/search-map-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SearchMapProvider>
      <div className="flex min-h-screen flex-col">
        <div className="flex-grow">
          <Header />
          <MaxWidthWrapper className="h-full">{children}</MaxWidthWrapper>
        </div>
        <Footer />
      </div>
    </SearchMapProvider>
  );
}
