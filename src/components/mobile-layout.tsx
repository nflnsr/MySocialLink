// import { Instagram, Linkedin, Github, Signal, Wifi, BatteryMedium } from "lucide-react";
import { cn } from "@/lib/tailwind-merge";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="w-full">
      <div className="min-h-screen flex items-center mx-auto justify-center w-full">
          <div
            className={cn(
              "w-full min-h-[calc(var(--vh,1vh)*100)] bg-gradient-to-b from-[#D9F99D] via-[#62E9E6] to-[#A5F3FC] flex flex-col dark:from-[#0369A1] dark:via-[#06B6D4] dark:to-[#06B6D4] pointer-events-none",
              className
            )}
          >
            {children}
          </div>
      </div>
    </div>
  );
}
