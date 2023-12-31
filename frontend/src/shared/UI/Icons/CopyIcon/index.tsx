interface IProps {
  className?: string;
  onClick: () => void;
}

export function CopyIcon({ className, onClick }: IProps) {
  return (
    <svg
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <rect
        x="1"
        y="1.5"
        width="10"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13.5 5.90137C14.3967 6.42008 15 7.3896 15 8.50002V16.5C15 18.1569 13.6569 19.5 12 19.5H8.00002C6.8896 19.5 5.92008 18.8967 5.40137 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
