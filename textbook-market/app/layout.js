import AuthContext from "../lib/auth-context";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <AuthContext>
        <body>{children}</body>
      </AuthContext>
    </html>
  );
}
