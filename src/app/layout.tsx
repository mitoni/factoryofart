import "./globals.css";

export const metadata = {
  title: "F.ART - WE CREATE WORLDS",
  description:
    "Multidisciplinary studio based in Milan. Art, Design, Film, Photography, Cross-media Communication, and beyond. Above all, we believe in DREAMS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {
          // <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          // <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          // <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          // <link rel="manifest" href="/site.webmanifest" />
        }
      </head>

      <body>{children}</body>
    </html>
  );
}
