import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060b13",
};

export const metadata: Metadata = {
  title: "Axiora Software Labs | Enterprise Custom Software & AI Engineering",
  description:
    "Axiora Software Labs is a premier software development agency delivering high-performance web applications, enterprise software, AI/ML engineering, and dedicated tech teams worldwide.",
  keywords: [
    "Axiora Software Labs",
    "Custom Software Development",
    "AI Development",
    "Web Development",
    "Enterprise Software Agency",
    "Mobile App Development",
    "Cloud & DevOps"
  ],
  authors: [{ name: "Axiora Software Labs" }],
  icons: {
    icon: "/axiora-logo-v2.png",
    apple: "/axiora-logo-v2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#060b13] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
