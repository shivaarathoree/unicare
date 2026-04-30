import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniCare - Student Clarity & Transformation",
  description:
    "UniCare helps students move from confusion to consistent action through honest mentoring, product thinking, fitness coaching proof, business experience, offline sessions, and simple execution systems.",
  keywords:
    "UniCare, UNI Organisation, Shiva Rathore, Parth Pandey, JEE mentoring, student coaching, fitness transformation, student clarity, discipline, execution, UniPathSchool, Uniflow, UniDraw, Hatchr, student transformation",
  openGraph: {
    title: "UniCare - Student Clarity & Transformation",
    description:
      "A trust-led student transformation system for clarity, discipline, and execution.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#050505] text-[#F8F5F0] antialiased overflow-x-hidden selection:bg-[#FF4500]/20 selection:text-[#FFDFB3]">
        {children}
      </body>
    </html>
  );
}
