import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reza.dev"),
  title: "Muhammad Rizal Abidin — Web Developer",
  description:
    "Portfolio of Muhammad Rizal Abidin, Web Developer focused on building functional, structured, and user-friendly websites and digital systems.",
  keywords: [
    "Muhammad Rizal Abidin",
    "Rizal",
    "Web Developer",
    "PKL Archive Digitization",
    "Web Development",
    "HTML5 CSS3 JavaScript",
    "Full-Stack Developer",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Muhammad Rizal Abidin", url: "https://reza.dev" }],
  openGraph: {
    title: "Muhammad Rizal Abidin — Web Developer",
    description: "Portfolio of functional, structured, and modern websites and digital systems.",
    type: "website",
    locale: "en_US",
    siteName: "Muhammad Rizal Abidin Portfolio",
    images: [
      {
        url: "/images/reza-portrait-editorial.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Rizal Abidin — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rizal Abidin — Web Developer",
    description: "Portfolio of modern websites and web applications.",
    images: ["/images/reza-portrait-editorial.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-[#FAFAFA] text-neutral-900 min-h-screen selection:bg-neutral-900 selection:text-white antialiased relative">
        <div className="fixed inset-0 pointer-events-none z-40 grain-overlay opacity-[0.018]" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
