import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import authenticated from "./auth/authenticated";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "react-hot-toast";
import InstallPromptHandler from "./install-prompt-handler";
import InstallPromptButton from "./install-prompt";
const inter = Inter({ subsets: ["latin"] });

import type { ReactNode } from "react";

const APP_NAME = "Niceday";
const APP_DEFAULT_TITLE = "Niceday";
const APP_TITLE_TEMPLATE = "%s - Niceday";
const APP_DESCRIPTION =
  "Niceday is a platform for managing your daily Attendance";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

// export const metadata: Metadata = {
//   title: "Niceday",
//   description: "Niceday is a platform for managing your daily Attendance",
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await authenticated();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers authenticated={isAuthenticated}>
          <Suspense fallback={<Loading />}>
            <main className="max-w-screen-xl h-dvh">{children}</main>
            {/* <InstallPromptHandler /> */}
            <InstallPromptButton />
          </Suspense>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
