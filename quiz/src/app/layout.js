import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pace",
  description: "Track time spent on each question, not just the final score",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              className: '!bg-card !text-foreground !border !border-border !rounded-xl !shadow-lg',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}