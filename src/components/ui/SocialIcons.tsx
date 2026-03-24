import React from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const TikTokIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("transition-colors", className)}
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.69a6.32 6.32 0 0 0 10.57 4.58 6.25 6.25 0 0 0 2.14-4.59V7.93a9.06 9.06 0 0 0 5.23 1.69V6.17a4.87 4.87 0 0 1-3.35-1.48z" />
  </svg>
);

export const WhatsAppIcon = ({ size = 20, className, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("transition-colors", className)}
    {...props}
  >
    <path d="M12.01 2.01C6.48 2.01 2 6.48 2 12.01c0 1.74.45 3.38 1.23 4.81l-1.31 4.79 4.91-1.29c1.38.76 2.96 1.19 4.65 1.19 5.53 0 10.01-4.48 10.01-10.01S17.54 2.01 12.01 2.01zm5.46 13.65c-.24.68-1.22 1.25-1.64 1.32-.38.07-.86.12-2.39-.5-1.96-.8-3.22-2.78-3.32-2.91-.1-.13-.8-1.07-.8-2.03 0-.97.51-1.44.68-1.64s.39-.25.52-.25.26 0 .38.01c.11.01.27-.04.42.33.15.37.52 1.28.57 1.38.05.09.08.2.02.32-.06.12-.09.2-.18.3-.09.1-.19.23-.27.31-.09.09-.18.19-.08.37.1.18.47.77 1 1.24.69.61 1.27.8 1.45.89.18.09.29.08.39-.05.1-.12.45-.53.57-.71.12-.18.24-.15.41-.09l1.23.59c.18.09.3.14.35.21.05.07.11.44-.13 1.12z" />
  </svg>
);
