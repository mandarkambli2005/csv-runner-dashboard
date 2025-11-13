import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "CSV Runner Dashboard",
  description: "Upload a CSV and view metrics & charts."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
