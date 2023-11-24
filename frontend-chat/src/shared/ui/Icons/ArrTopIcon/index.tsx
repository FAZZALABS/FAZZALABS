interface IProps {
  className?: string;
  onClick?: () => void;
}

export function ArrTopIcon({ className, onClick }: IProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M15.2 13.3L12.6828 10.5891C12.2872 10.1631 11.6128 10.1631 11.2172 10.5891L8.7 13.3M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
