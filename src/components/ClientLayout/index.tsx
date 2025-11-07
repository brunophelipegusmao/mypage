"use client";

import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Header />
      {children}
    </ThemeProvider>
  );
}
