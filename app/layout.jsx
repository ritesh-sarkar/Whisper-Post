import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Poppins, Inter } from "next/font/google";

// Components and custom libs
import ConditionalMainHeader from "@/app/components/ConditionalMainHeader";
import ConditionalFooter from "@/app/components/ConditionalFooter";
import CustomCursor from "./components/CustomCursor";
import { Authprovider } from "@/lib/Authprovider";

// Analytics and Speed Insights
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "WhisperPost - Send & Receive Anonymous Messages",
  description:
    "WhisperPost lets you create a profile and receive anonymous messages securely and easily. Share your link and get honest feedback from friends or strangers.",
  keywords: [
    "WhisperPost",
    "anonymous message",
    "send secret message",
    "receive anonymous feedback",
    "anonymous chat tool",
    "whisper link",
    "get messages secretly",
    "no identity message",
  ],
  metadataBase: new URL("https://whisper-post.vercel.app"),
  openGraph: {
    title: "WhisperPost - Anonymous Messaging Platform",
    description:
      "Create your profile, share your link, and receive anonymous messages with WhisperPost. 100% free and privacy-focused.",
    url: "https://whisper-post.vercel.app",
    siteName: "WhisperPost",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "WhisperPost Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhisperPost | Send Anonymous Messages",
    description:
      "Receive anonymous feedback from anyone. Simple, private, and easy to use.",
    images: ["/og.webp"],
    creator: "Ritesh Sarkar",
  },

  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "google-site-verification": "h0l0uTNeF1BayotC41QD2O8u_YxbLgnlc40D6QdTX2o",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`
          ${poppins.variable}
          ${inter.variable}
          antialiased
          bg-bg
          h-full
          w-full
          text-text
          font-secondary
          overflow-x-hidden
          select-none
        `}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-glass)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              fontFamily: "var(--font-secondary)",
            },

            success: {
              style: {
                border: "1px solid var(--accent-secondary)",
              },
              iconTheme: {
                primary: "var(--accent-secondary)", // cyan
                secondary: "var(--bg-primary)",
              },
            },

            error: {
              style: {
                border: "1px solid #ff5656",
              },
              iconTheme: {
                primary: "#ff5656",
                secondary: "var(--bg-primary)",
              },
            },
          }}
        />

        <Authprovider>
          <ConditionalMainHeader />
          <CustomCursor />
          {children}
          <Analytics />
          <SpeedInsights />
          <ConditionalFooter />
        </Authprovider>
      </body>
    </html>
  );
}
