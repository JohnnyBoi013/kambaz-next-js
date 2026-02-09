"use client";

import { ReactNode, useState } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function KambazLayout({ children }: { children: ReactNode }) {
  const [showKambazNav, setShowKambazNav] = useState(false);

  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation show={showKambazNav} />
        </div>
        <div className="wd-main-content-offset flex-fill">{children}</div>
      </div>
    </div>
  );
}
