import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "智慧学堂 | 官方首页 Demo",
  description:
    "智慧学堂是以东方内观智慧为根基的身心疗愈与成长平台，通过课程、练习与陪伴帮助用户回到内在秩序。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
