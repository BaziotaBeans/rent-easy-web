import { IconType } from "@/types/iconType";


export function HomeSellIcon({ size = 24, isPrimaryColor }: IconType) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.6667 12.6667L16 1L1 16H4.33333V27.6667C4.33333 28.5507 4.68452 29.3986 5.30964 30.0237C5.93477 30.6488 6.78261 31 7.66667 31H17.6667"
        stroke={isPrimaryColor ? "#6A4CFF" : "#CBD5E0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 31.0001V21.0001C11 20.116 11.3512 19.2682 11.9763 18.6431C12.6014 18.0179 13.4493 17.6667 14.3333 17.6667H17.6667C18.3117 17.6667 18.9133 17.8501 19.4233 18.1667M31 21.0001H26.8333C26.1703 21.0001 25.5344 21.2635 25.0656 21.7323C24.5967 22.2012 24.3333 22.837 24.3333 23.5001C24.3333 24.1631 24.5967 24.799 25.0656 25.2678C25.5344 25.7367 26.1703 26.0001 26.8333 26.0001H28.5C29.163 26.0001 29.7989 26.2635 30.2678 26.7323C30.7366 27.2012 31 27.837 31 28.5001C31 29.1631 30.7366 29.799 30.2678 30.2678C29.7989 30.7367 29.163 31.0001 28.5 31.0001H24.3333M27.6667 31.0001V32.6667M27.6667 19.3334V21.0001"
        stroke={isPrimaryColor ? "#6A4CFF" : "#CBD5E0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
