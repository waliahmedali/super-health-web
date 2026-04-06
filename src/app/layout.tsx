import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Standard Therapeutics",
  description:
    "Your home to new health. Standard Therapeutics is your functional health partner. We are here for your preventative and personalised health.",
  metadataBase: new URL("https://app.standardthera.com"),
  openGraph: {
    title: "Standard Therapeutics",
    description:
      "Your home to new health. Standard Therapeutics is your functional health partner. We are here for your preventative and personalised health.",
    url: "https://app.standardthera.com",
    siteName: "Standard Therapeutics",
    images: [
      {
        url: "/assets/social-share.png",
        width: 1024,
        height: 1024,
        alt: "Standard Therapeutics",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Standard Therapeutics",
    description:
      "Your home to new health. Standard Therapeutics is your functional health partner. We are here for your preventative and personalised health.",
    images: ["/assets/social-share.png"],
  },
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
