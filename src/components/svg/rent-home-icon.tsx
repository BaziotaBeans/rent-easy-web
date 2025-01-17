import { IconType } from "@/types/iconType";

export function RentHomeIcon({ size = 24, isPrimaryColor }: IconType) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.9056 6.49632L11.2393 2.08907C10.7421 1.70222 10.13 1.49219 9.5 1.49219C8.86998 1.49219 8.25795 1.70222 7.76069 2.08907L2.09331 6.49632C1.75302 6.76145 1.47767 7.1007 1.28822 7.48826C1.09876 7.87583 1.00019 8.30149 1 8.73288V16.3829C1 16.9465 1.22388 17.487 1.6224 17.8855C2.02091 18.284 2.56141 18.5079 3.125 18.5079H15.875C16.4386 18.5079 16.9791 18.284 17.3776 17.8855C17.7761 17.487 18 16.9465 18 16.3829V8.73288C18 7.85844 17.5962 7.03288 16.9056 6.49632Z"
        stroke={isPrimaryColor ? "#6A4CFF" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7181 13.1794C11.37 14.5958 7.56414 14.5958 5.21814 13.1794"
        stroke={isPrimaryColor ? "#6A4CFF" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
