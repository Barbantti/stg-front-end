/*
 * Arquivo: layout.tsx 
 *	Autor: Leonardo Barbanti
 */

"use client";

import { Providers } from "./providers";

// Função principal do layout da aplicação que envolve os Providers
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
