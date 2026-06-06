import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iron Forge Gym | Premium Fitness SaaS",
  description: "Forge your ultimate physique at Iron Forge Gym. Access state-of-the-art facilities, certified personal trainers, custom workout plans, and real-time tracking.",
  keywords: ["gym management", "fitness tracking", "workout plans", "diet plans", "personal trainer", "Iron Forge Gym"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth dark">
      <body className="min-h-full flex flex-col antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
