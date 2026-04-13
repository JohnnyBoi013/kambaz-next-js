"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

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
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          href="/account/users"
          className={`list-group-item border-0 ${
            pathname.endsWith("users") ? "active text-black" : "text-danger"
          }`}
        >
          Users
        </Link>
      )}
    </div>
  );
}
