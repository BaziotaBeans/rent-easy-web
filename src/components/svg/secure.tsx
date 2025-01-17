import { IconType } from "@/types/iconType";

export function SecureSVG({ size }:IconType) {
  return (
    <svg
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9.00016L8.00016 10.9998L12 7"
        stroke="#344054"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.00019 19L9.88003 18.6198C11.7248 17.8282 13.3178 16.5469 14.4865 14.9147C15.6553 13.2825 16.3551 11.3616 16.5103 9.36016L16.9403 3.84016C16.9474 3.61156 16.8757 3.38748 16.7373 3.2054C16.5989 3.02332 16.4022 2.89427 16.18 2.83984L9.00019 1L1.82035 2.8C1.59829 2.85441 1.40164 2.98339 1.26325 3.16537C1.12486 3.34735 1.05313 3.57132 1.06003 3.79984L1.49011 9.31984C1.64519 11.3214 2.34499 13.2424 3.5137 14.8746C4.68242 16.5069 6.27549 17.7883 8.12035 18.58L9.00019 19Z"
        stroke="#01B73F"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
