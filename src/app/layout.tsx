import type { Metadata } from "next";
import { Provider } from "react-redux";
import store from "src/lib/store";

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
        <Provider store={store}>
          <div id="root">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
