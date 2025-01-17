import { IconType } from "@/types/iconType";

export function HomeRentIcon({ size, isPrimaryColor }:IconType) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.6667 21H31.0001V32.6667L26.8334 30.1667L22.6667 32.6667V21Z"
        stroke={isPrimaryColor ? "#6A4CFF" : "#CBD5E0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.3333 14.3333L16 1L1 16H4.33333V27.6667C4.33333 28.5507 4.68452 29.3986 5.30964 30.0237C5.93477 30.6488 6.78261 31 7.66667 31H16"
        stroke={isPrimaryColor ? "#6A4CFF" : "#CBD5E0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 31.0001V21.0001C11 20.116 11.3512 19.2682 11.9763 18.6431C12.6014 18.0179 13.4493 17.6667 14.3333 17.6667H16.8333"
        stroke={isPrimaryColor ? "#6A4CFF" : "#CBD5E0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
