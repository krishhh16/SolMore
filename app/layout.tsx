
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Handjet } from 'next/font/google';
import AppWalletProvider  from '@/components/App/AppWalletProvider';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const handjet = Handjet({ subsets: ['latin'], variable: '--font-handjet' });

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Solgotchi",
  description: "Fastest growing Solana staking platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${handjet.variable} font-sans`} suppressHydrationWarning>
      <AppWalletProvider>
      <body className="bg-background text-foreground">
        {children}
      </body>
      </AppWalletProvider>
    </html>
  );
}
