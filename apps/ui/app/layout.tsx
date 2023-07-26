import './global.css';

export const metadata = {
  title: 'Welcome',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: 'rgb(2, 6, 23)' }}>
      <body className="text-slate-500 bg-slate-950">{children}</body>
    </html>
  );
}
