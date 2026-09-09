/**
 * Login route layout — intentionally does NOT render NavBar or Footer
 * so the login/signup page is completely full-screen with no chrome.
 */
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
