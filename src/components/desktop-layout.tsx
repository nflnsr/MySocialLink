import { DeviceFrameset } from "react-device-frameset";
import { Instagram, Linkedin, Github, Signal, Wifi, BatteryMedium } from "lucide-react";
import { cn } from "@/lib/tailwind-merge";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div>
      <div className="min-h-screen flex items-center mx-auto justify-center">
        <DeviceFrameset device="iPhone X" color="gold" width={375} height={670}>
          <div
            className={cn(
              "h-full flex flex-col bg-gradient-to-b from-[#D9F99D] via-[#62E9E6] to-[#A5F3FC] dark:from-[#0369A1] dark:via-[#06B6D4] dark:to-[#06B6D4] transition-all duration-[800ms] pointer-events-none",
              className
            )}
          >
            <div className="pt-[6px] text-center bg-white/50 dark:bg-white/40 flex">
              <Instagram className="w-4 ml-[20px]" />
              <Github className="w-4 ml-1" />
              <Linkedin className="w-4 ml-1" />
              <Wifi className="w-4 ml-[220px]" />
              <Signal className="w-4 ml-1" />
              <BatteryMedium className="w-6 ml-1" />
            </div>

            {children}
          </div>
        </DeviceFrameset>
      </div>
    </div>
  );
}
