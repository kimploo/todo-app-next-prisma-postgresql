import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

const poppins = Poppins({
  subsets: ["latin"],
  fallback: ["sans-serif"],
  weight: ["300", "400", "500", "700", "800", "900"],
});
const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </SessionProvider>
  );
}
