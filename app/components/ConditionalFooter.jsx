"use client";
import { usePathname } from "next/navigation";

import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const ConditionalFooter = () => {
  const socialLinks = [
    {
      name: "Github",
      link: "https://github.com/ritesh-sarkar",
      icon: <FaGithub />,
    },
    {
      name: "Facebook",
      link: "https://www.facebook.com/ritesh.sarkar.showharda",
      icon: <FaFacebook />,
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/rt.ritesh.1508/",
      icon: <FaInstagram />,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/ritesh-sarkar/",
      icon: <FaLinkedin />,
    },
  ];

  const pathname = usePathname();
  if (pathname === "/" || pathname === "/dashboard")
    return (
      <footer
        className="
        border-t-2
        border-solid
        border-border 
        py-10
        bg-transparent
        flex
        flex-col
        justify-center
        items-center
        gap-5
        "
      >
        <div
          className="   
          text-text-alt
          text-center
          font-secondary
          "
        >
          ©2026 WhisperPost. All rights reserved by
          <a
            className="
              font-semibold
              font-primary
              cursor-pointer
            "
            href="http://ritesh-sarkar.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {""} Ritesh Sarkar.
          </a>
        </div>

        {/* Social links */}

        <div>
          <ul
            className="
              flex
              justify-center
              items-center
              gap-5
            "
          >
            {socialLinks.map((link) => (
              <li
                className={`
                    text-text-alt
                    text-2xl
                    font-semibold
                    font-primary
                    cursor-pointer
                    transition-all
                    duration-300
                    ease-in-out
                    hover:scale-110
                    ${link.name === "Github" ? "hover:text-text" : 
                      link.name === "Facebook" ? "hover:text-[#1877F2]" : 
                      link.name === "Instagram" ? "hover:text-[#e1306c]" : 
                      link.name === "LinkedIn" ? "hover:text-[#0A66C2]" : ""} 
                  `}
                key={link.name}
              >
                <a href={link.link}>{link.icon}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    );
};

export default ConditionalFooter;
