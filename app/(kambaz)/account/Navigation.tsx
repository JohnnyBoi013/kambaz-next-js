"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const links = [
    { label: "Signin", path: "/account/signin" },
    { label: "Signup", path: "/account/signup" },
    { label: "Profile", path: "/account/profile" },
  ];

  return (
    <div
      id="wd-account-navigation"
      className="wd list-group fs-5 rounded-0"
      style={{ width: "200px" }}
    >
      {links.map((link) => {
        const isActive = pathname === link.path;

        return (
          <Link
            key={link.path}
            href={link.path}
            className={`list-group-item border-0 ${
              isActive ? "active text-black" : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
