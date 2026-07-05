import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.mayspear.com'),
  title: {
    default: 'Mayspear Global | Principal Investment & Private Capital at Institutional Scale',
    template: '%s',
  },
  description:
    'Mayspear Global is a principal investment and private credit group. We invest and co-invest across private equity, private credit, special situations, M&A, infrastructure, mining, energy and commodities, $1M to $5BN, with a decisive edge in the mid and lower-mid-market the largest firms will not touch.',
  themeColor: '#0C0B09',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
