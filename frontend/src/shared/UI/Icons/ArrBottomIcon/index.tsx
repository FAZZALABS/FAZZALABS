interface IProps {
  className?: string;
  onClick?: () => void;
}

export function ArrBottomIcon({ className, onClick }: IProps) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M8.8 11.0121L11.3172 13.723C11.7128 14.149 12.3872 14.149 12.7828 13.723L15.3 11.0121M2 12.3121C2 17.835 6.47715 22.3121 12 22.3121C17.5228 22.3121 22 17.835 22 12.3121C22 6.78929 17.5228 2.31213 12 2.31213C6.47715 2.31213 2 6.78929 2 12.3121Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
