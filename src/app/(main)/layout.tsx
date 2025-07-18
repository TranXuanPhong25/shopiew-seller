import { Metadata } from 'next';
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"

import { SidebarInset, SidebarProvider, } from "@/components/ui/sidebar"
import NavHeader from '@/components/layout/nav-header';
import { ChatWidget } from '@/features/chat-widget/chat.widget';

export const metadata: Metadata = {
  title: 'Shopiew Seller',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <NavHeader />
          <div className="m-[9px] ">
            <div>
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <ChatWidget />
    </>
  );
}