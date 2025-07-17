import { useEffect, useState } from "react";
const sectionsNav = [
   { id: "basic-info-section", label: "Thông tin cơ bản" },
   { id: "sales-info-section", label: "Thông tin bán hàng" },
   { id: "shipping-section", label: "Vận chuyển" },
   { id: "other-info-section", label: "Thông tin khác" },
];
const useSectionsNav = () => {

   const [currentTab, setCurrentTab] = useState<string>(sectionsNav[0].id);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  setCurrentTab(entry.target.id)
               }
            })
         },
      { threshold:1 },
      )

      document.querySelectorAll("section[id]").forEach((section) => {
         observer.observe(section)
      })

      return () => observer.disconnect()
   }, [])
   return {
      currentTab
   };
}
export { useSectionsNav, sectionsNav };