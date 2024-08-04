"use client";

// Import các module và component cần thiết
import {
  Home,
  Cloudy,
  BookText,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MoreDropdown from "./MoreDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Tạo danh sách các liên kết
const links = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "History", href: "/history", icon: Cloudy },
  { name: "Guide", href: "/guide", icon: BookText },
  { name: "Profile", isAvatar: true, href: "./profile", icon: Menu }, 
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        const isActive = pathname === link.href;

        // if (link.isDropdown) {
        //   return (
        //     <MoreDropdown
        //       key={link.name}
        //       buttonClassName={buttonVariants({
        //         variant: isActive ? "secondary" : "ghost",
        //         className: cn("navLink"),
        //         size: "lg",
        //       })}
        //       iconClassName="w-6"
        //       buttonLabel="More"
        //     />
        //   );
        // }

        if (link.isAvatar) {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={buttonVariants({
                variant: isActive ? "secondary" : "ghost",
                className: cn("navLink"),
                size: "lg",
              })}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p
                className={`${cn("hidden lg:block", {
                  "font-extrabold": isActive,
                })}`}
              >
                {link.name}
              </p>
            </Link>
          );
        }

        return (
          <Link
            key={link.name}
            href={link.href}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink"),
              size: "lg",
            })}
          >
            <LinkIcon className="w-6" />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;