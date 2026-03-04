"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";

type UserChoiceOutcome = "accepted" | "dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: UserChoiceOutcome;
    platform: string;
  }>;
}

const IOS_INSTALL_MESSAGE =
  "No iPhone/iPad, abra no Safari, toque em Compartilhar e selecione Adicionar à Tela de Início.";

function isInstalled() {
  const standaloneByDisplayMode = window.matchMedia(
    "(display-mode: standalone)",
  ).matches;
  const standaloneByNavigator = Boolean(
    (navigator as Navigator & { standalone?: boolean }).standalone,
  );

  return standaloneByDisplayMode || standaloneByNavigator;
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(() =>
    typeof window === "undefined" ? false : isInstalled(),
  );
  const [isIos] = useState(() =>
    typeof window === "undefined" ? false : isIosDevice(),
  );

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = () => {
      setIsStandalone(isInstalled());
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    mediaQuery.addEventListener("change", handleDisplayModeChange);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      mediaQuery.removeEventListener("change", handleDisplayModeChange);
    };
  }, []);

  const showIosFallback = isIos && !isStandalone;

  if (isStandalone || (!deferredPrompt && !showIosFallback)) {
    return null;
  }

  const handleClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return;
    }

    window.alert(IOS_INSTALL_MESSAGE);
  };

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Instalar aplicativo"
      title="Instalar aplicativo"
    >
      <Download className="h-5 w-5" />
    </button>
  );
}
