"use client";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const section = pathname.split("/").pop();
  return (
    <span>
      {section?.charAt(0).toUpperCase()}
      {section?.slice(1)}
    </span>
  );
}
