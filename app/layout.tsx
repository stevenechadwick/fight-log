import { ReactNode } from 'react';
import { Providers } from './providers' 

import './globals.css'
import LayoutNav from './components/navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body>
        <Providers>
          <div className="px-4 lg:px-32 max-w-screen-xl mx-auto">
          <LayoutNav />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}