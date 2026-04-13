"use client";
import { usePathname } from "next/navigation";

const ConditionalFooter = () => {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/dashboard")
    return (
      <footer
        className="
        border-t-2
        border-solid
        border-border 
        py-8
        bg-transparent
        "
      >
        <div
          className="   
          text-text-alt
          text-center
          "
        >
          © 2025 WhisperPost. All rights reserved by Ritesh Sarkar.
        </div>
      </footer>
    );
};

export default ConditionalFooter;
