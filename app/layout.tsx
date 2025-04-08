import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Reserva de Quadras',
  description: 'App para reservar quadras de clube',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}