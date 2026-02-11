import { cookies } from "next/headers";
import ThemeProvider from "./ThemeContext";

export default async function ProviderExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const test = await cookies();
  console.log(test);
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
