import { Header } from "./[id]/components/header";


export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
        <main className="flex flex-col min-h-screen bg-zinc-100">
            <Header/>
            {children}
        </main>
    )
  }
