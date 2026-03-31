import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Standard Therapeutics",
  description: "Production web app scaffold",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
