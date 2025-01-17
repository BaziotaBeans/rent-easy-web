"use client"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen bg-white py-10" suppressHydrationWarning={true}>
      {children}
      </main>
  );
}
