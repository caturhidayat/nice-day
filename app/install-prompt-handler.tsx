"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallPromptHandler() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(() => {
    const hasUserDismissed = localStorage.getItem('installPromptDismissed');
    return !hasUserDismissed;
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const hasUserDismissed = localStorage.getItem('installPromptDismissed');
      if (!hasUserDismissed) {
        setShowInstallButton(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    const handleInstallClick = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
          setDeferredPrompt(null);
          setShowInstallButton(false);
          localStorage.setItem('installPromptDismissed', 'true');
        });
      }
    };

    if (showInstallButton) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <button
                  onClick={handleInstallClick}
                  className="btn btn-primary btn-sm"
                >
                  Install App
                </button>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Install App</p>
                <p className="mt-1 text-sm text-gray-500">
                  Install this app on your device
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setShowInstallButton(false);
                localStorage.setItem('installPromptDismissed', 'true');
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Dismiss
            </button>
          </div>
        </div>
      ));
    }
  }, [showInstallButton, deferredPrompt]);

  return null;
}
