import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mohri Muakpo | Fullstack & Cloud Engineer",
  description:
    "Product-focused Fullstack & Cloud Engineer specializing in scalable systems, APIs, and Azure cloud solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}