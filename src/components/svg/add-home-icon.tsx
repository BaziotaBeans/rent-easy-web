import { IconType } from "@/types/iconType";


export function AddHomeIcon({ size = 24 }:IconType) {
  console.log('Size:', size);

  return (
    <svg
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px` }}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M1.80959 10.8143C1.48659 8.57285 1.32509 7.4517 1.78494 6.49375C2.24479 5.5358 3.22229 4.9527 5.17814 3.7882L6.35539 3.08695C8.13019 2.0287 9.01929 1.5 10.0002 1.5C10.9811 1.5 11.8693 2.0287 13.645 3.08695L14.8222 3.7882C16.7772 4.9527 17.7556 5.5358 18.2154 6.49375C18.6753 7.4517 18.5129 8.57285 18.1899 10.8143L17.9536 12.4608C17.5397 15.3406 17.3323 16.7796 16.3335 17.6398C15.3348 18.5 13.8702 18.5 10.9403 18.5H9.06009C6.13014 18.5 4.66559 18.5 3.66684 17.6398C2.66809 16.7796 2.46069 15.3406 2.04674 12.4608L1.80959 10.8143Z"
        stroke="#6A4CFF"
        strokeOpacity="0.53"
        strokeWidth="1.5"
      />
      <path
        d="M12.5502 10.85H10.0002M10.0002 10.85H7.4502M10.0002 10.85V8.30005M10.0002 10.85V13.4"
        stroke="#6A4CFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
