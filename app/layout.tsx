import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "dotenv/config"
import "./globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import AppLayout from "@/components/app-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick & Morty",
  description: "A beautiful app created with Next JS, Typescript, Tailwind CSS and GraphQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-950 dark:text-white/70`}>

        <Flowbite>
          <AppLayout>
            {children}
          </AppLayout>
        </Flowbite>

      </body>
    </html>
  );
}
