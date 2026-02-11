import Navbar from "@/components/navbar";
import AuthProvider from "@/components/SessionProvider";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
      <Navbar />
        {children}
      </AuthProvider>
    
    </div>
  );
}