"use client";

import { useEffect } from "react";

import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !window.isSecureContext) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch (error) {
        console.error("Falha ao registrar o service worker:", error);
      }
    };

    if (document.readyState === "complete") {
      void registerServiceWorker();
      return;
    }

    const handleLoad = () => {
      void registerServiceWorker();
    };

    window.addEventListener("load", handleLoad, { once: true });
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <ThemeProvider>
      <Header />
      {children}
    </ThemeProvider>
  );
}
