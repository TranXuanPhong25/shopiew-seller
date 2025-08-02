"use client"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { cn, slugsTransform } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const NavBreadcrumb = () => {
   console.log(document.title)
   const pathname = usePathname();
   const [pageTitle, setPageTitle] = useState("");

   useEffect(() => {
      // Access document.title only in useEffect to avoid hydration mismatch
      setPageTitle(document.title.replace(/ \|Shopiew.+/, ""));
   }, [pathname]);

   const pathnameParts = pathname.split('/').
      map(part => slugsTransform(part))
      .slice(1, -1)

   return (
      <Breadcrumb>
         <BreadcrumbList>
            {pathnameParts.map((part, index) => (
               <>
                  <BreadcrumbItem key={index}>
                     <BreadcrumbPage>
                        <BreadcrumbLink href={`/${pathnameParts.slice(0, index + 1).join('/')}`} asChild>
                           <Link
                              href={`/${pathnameParts.slice(0, index + 1).join('/')}`}
                              className={"text-sm font-semibold text-muted-foreground hover:text-gray-700"}
                           >
                              {part}
                           </Link>
                        </BreadcrumbLink>
                     </BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
               </>
            ))}
            <BreadcrumbItem>
               <BreadcrumbPage>
                  <BreadcrumbLink asChild>
                     <span className="font-semibold">{pageTitle}</span>
                  </BreadcrumbLink>
               </BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   )
}

export { NavBreadcrumb }
export default NavBreadcrumb;