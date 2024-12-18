import '../styles/globals.css'
import { AuthProvider } from '@/utils/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
