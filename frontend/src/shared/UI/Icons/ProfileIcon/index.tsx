export function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg
      width="27"
      height="28"
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        y="0.5"
        width="27"
        height="27"
        rx="13.5"
        fill="url(#paint0_linear_256_51)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_256_51"
          x1="-3.4659e-07"
          y1="-1.5"
          x2="28"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2FFBD" />
          <stop offset="1" stopColor="#D70000" />
        </linearGradient>
      </defs>
    </svg>
  );
}
