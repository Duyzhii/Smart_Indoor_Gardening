"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  Menu,
  Moon,
  Sun,
  SlidersHorizontal,
  PersonStanding,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { toast } from "react-hot-toast";
// import { useControlMode } from "@/app/context/ControlModeContext";

interface MoreDropdownProps {
  buttonClassName: string;
  iconClassName: string;
  buttonLabel: string;
}

function MoreDropdown({ buttonClassName, iconClassName, buttonLabel }: MoreDropdownProps) {
  const [showModeToggle, setShowModeToggle] = useState(false);
  const [showControlMode, setShowControlMode] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [controlMode, setControlMode] = useState<string>("manual");
  // const { controlMode, setControlMode } = useControlMode();
  

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!event.target) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowModeToggle(false);
        setShowControlMode(false);
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);

  const handleBackClick = () => {
    if (showControlMode) {
      setShowControlMode(false);
    } else {
      setShowModeToggle(false);
    }
  };

  const handleControlModeChange = (checked: boolean) => {
    const newMode = checked ? "automatic" : "manual";
    setControlMode(newMode);

    if (newMode == "automatic") {
      toast.success(
        `Switched to Automatic Control Mode`
      );
    }
    else {
      toast.error(
        `Switched to Manual Control Mode`
      );
    }
  };

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpen(!open)}
          variant={"ghost"}
          size={"lg"}
          className={buttonClassName}
        >
          <Menu className={iconClassName} />
          <div className="hidden lg:block">{buttonLabel}</div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={ref}
        className={cn(
          "dark:bg-neutral-800 w-64 !rounded-xl !p-0 transition-opacity",
          !open && "opacity-0"
        )}
        align="end"
        alignOffset={-40}
      >
        {!showModeToggle && !showControlMode && (
          <>
            <DropdownMenuItem
              className="menuItem"
              onClick={() => setShowControlMode(true)}
            >
              <SlidersHorizontal size={20} />
              <p>Control Mode</p>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="menuItem"
              onClick={() => setShowModeToggle(true)}
            >
              <Moon size={20} />
              <p>Switch appearance</p>
            </DropdownMenuItem>
          </>
        )}

        {(showModeToggle || showControlMode) && (
          <>
            <div className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5">
              <ChevronLeft size={18} className="mr-1" onClick={handleBackClick} />
              <p className="font-bold ml-1">
                {showControlMode ? "Change Control Mode" : "Switch appearance"}
              </p>
              {showControlMode ? (
                <PersonStanding size={20} className="ml-auto" />
              ) : theme === "dark" ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
            </div>

            {!showControlMode && (
              <Label htmlFor="dark-mode" className="menuItem">
                Dark Mode
                <DropdownMenuItem className="ml-auto !p-0">
                  <Switch
                    id="dark-mode"
                    className="ml-auto"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? "dark" : "light");
                      toast.success(
                        `Switched to ${checked ? "Dark" : "Light"} Mode`
                      );
                    }}
                  />
                </DropdownMenuItem>
              </Label>
            )}

            {showControlMode && (
              <Label htmlFor="control-mode" className="menuItem">
                {controlMode === "manual" ? "Manual Mode" : "Automatic Mode"}
                <DropdownMenuItem className="ml-auto !p-0">
                  <Switch
                    id="control-mode"
                    className="ml-auto"
                    checked={controlMode === "automatic"}
                    onCheckedChange={(checked) => handleControlModeChange(checked)}
                  />
                </DropdownMenuItem>
              </Label>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreDropdown;
