import { ReactNode } from 'react';
import { Providers } from './providers' 

import './globals.css'
import LayoutNav from './components/navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body>
        <Providers>
          <LayoutNav />
          <div className="px-4 lg:px-32">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}