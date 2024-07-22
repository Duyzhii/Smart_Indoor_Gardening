import { Shrub } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
// import { calSans } from "@/app/fonts";

function Logo() {
  return (
    <Link
      href={"/dashboard"}
      className={buttonVariants({
        className:
          "hidden md:flex navLink !mb-10 lg:hover:bg-transparent lg:!p-0 mx-auto justify-center",
        variant: "ghost",
        size: "lg",
      })}
    >
      <Shrub className="h-6 w-6 shrink-0 lg:hidden" />
      <p
        className={`font-semibold text-xl hidden lg:block`}
      >
        Smart Indoor Gardening
      </p>
    </Link>
  );
}

export default Logo;