import '../styles/globals.css'
import { AuthProvider } from '@/utils/AuthContext';

export const metadata = {
  title: 'Linkbrary',
  description: '세상의 모든 정보를 쉽게 저장하고 관리해 보세요.',
  icons: {
    icon: '/icons/ic_link.svg',
  },
};

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
