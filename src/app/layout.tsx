import "./globals.css";
import { CirclePointer } from "@/components/circlepointer/circlepointer";
import Overlay from "@/components/overlay/overlay";

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
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body>
        <CirclePointer />
        <Overlay />
        {children}
      </body>
    </html>
  );
}
