import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avis reçus | Ariel",
  robots: {
    index: false,
    follow: false
  }
};

export default function RatingsLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
