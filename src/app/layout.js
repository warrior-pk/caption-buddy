import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Caption Buddy",
  description: "A captioning tool for the masses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body className={`min-h-[100svh] flex flex-col`}>
        <header className="container mx-auto py-8 mb-8 flex justify-between">
          <div className="brand">
            <h1 className="text-3xl md:text-4xl">
              <Link href="/">Caption&nbsp;Buddy</Link>
            </h1>
          </div>
          <nav className="flex justify-around items-center gap-8">
            <Link href="/">Home</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
        <main className="container mx-auto flex-grow relative">{children}</main>
      </body>
    </html>
  );
}
