'use client';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { useState, useEffect } from 'react';
import LoadingAnimation from '@/components/ui/loading-animation';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isLoading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
              <LoadingAnimation
                titleFontClassName={playfair.className}
                subtitleFontClassName={inter.className}
              />
            </div>
          ) : (
            <>
              <Toaster />
              {children}
            </>
          )}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
