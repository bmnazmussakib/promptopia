import Nav from "@components/Nav";
import "@styles/global.css";

export const metaData = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
            {children}
        </main>
      </body>
    </html>
  );
}
