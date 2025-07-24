"use client";
import { useAuth } from "@/features/auth/hook";
import { Skeleton } from "../ui/skeleton";

export const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
   const { user, loginWithRedirect, loading } = useAuth();

   if (loading) {
      return <Skeleton className="h-screen w-full" />;
   }

   if (!user) {
      loginWithRedirect(window.location.href);
      return null;
   }
   

   return children   
};
export default ProtectedPage;