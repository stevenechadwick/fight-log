import { ReactNode } from 'react';
import { Providers } from './providers' 

import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}