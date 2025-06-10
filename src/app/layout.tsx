import { Providers } from "./Providers";

import type { Metadata } from "next";
import "../output.css";

export const metadata: Metadata = {
  title: "splitthebill.io",
  description: "Help you split the bill with your friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div id="root min-w-[800px]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
