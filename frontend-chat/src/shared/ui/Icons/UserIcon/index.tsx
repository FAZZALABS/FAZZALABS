import { useRecoilValue } from "recoil";
import { themeState } from "shared/libs/recoil";

interface IProps {
  className?: string;
  onClick: () => void;
}

export function UserIcon({ onClick, className }: IProps) {
  const theme = useRecoilValue(themeState);
  if (theme === "blue") {
    return (
      <svg
        width="84"
        height="84"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        onClick={onClick}
      >
        <g filter="url(#filter0_dd_208_2683)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M67 17H17V67H67V17ZM17 16H16V17V67V68H17H67H68V67V17V16H67H17ZM41.9993 50.2586C34.9045 50.2586 28.4908 53.1712 23.8872 57.8673L23.1731 57.1672C27.957 52.2872 34.6249 49.2586 41.9993 49.2586C49.6853 49.2586 56.6035 52.5484 61.4215 57.7953L60.6849 58.4716C56.0484 53.4224 49.3937 50.2586 41.9993 50.2586ZM48.7584 36.8276C48.7584 40.5603 45.7324 43.5862 41.9998 43.5862C38.2671 43.5862 35.2411 40.5603 35.2411 36.8276C35.2411 33.0949 38.2671 30.069 41.9998 30.069C45.7324 30.069 48.7584 33.0949 48.7584 36.8276ZM49.7584 36.8276C49.7584 41.1125 46.2847 44.5862 41.9998 44.5862C37.7148 44.5862 34.2411 41.1125 34.2411 36.8276C34.2411 32.5426 37.7148 29.069 41.9998 29.069C46.2847 29.069 49.7584 32.5426 49.7584 36.8276Z"
            fill="#A6DFFF"
          />
        </g>
        <defs>
          <filter
            id="filter0_dd_208_2683"
            x="-4"
            y="-4"
            width="92"
            height="92"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.545833 0 0 0 0 0.8365 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_208_2683"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="8" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0.28 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_208_2683"
              result="effect2_dropShadow_208_2683"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_208_2683"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  } else {
    return (
      <svg
        width="84"
        height="84"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        onClick={onClick}
      >
        <g filter="url(#filter0_dd_208_2683)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M67 17H17V67H67V17ZM17 16H16V17V67V68H17H67H68V67V17V16H67H17ZM41.9993 50.2586C34.9045 50.2586 28.4908 53.1712 23.8872 57.8673L23.1731 57.1672C27.957 52.2872 34.6249 49.2586 41.9993 49.2586C49.6853 49.2586 56.6035 52.5484 61.4215 57.7953L60.6849 58.4716C56.0484 53.4224 49.3937 50.2586 41.9993 50.2586ZM48.7584 36.8276C48.7584 40.5603 45.7324 43.5862 41.9998 43.5862C38.2671 43.5862 35.2411 40.5603 35.2411 36.8276C35.2411 33.0949 38.2671 30.069 41.9998 30.069C45.7324 30.069 48.7584 33.0949 48.7584 36.8276ZM49.7584 36.8276C49.7584 41.1125 46.2847 44.5862 41.9998 44.5862C37.7148 44.5862 34.2411 41.1125 34.2411 36.8276C34.2411 32.5426 37.7148 29.069 41.9998 29.069C46.2847 29.069 49.7584 32.5426 49.7584 36.8276Z"
            fill="#36A834"
          />
        </g>
        <defs>
          <filter
            id="filter0_dd_208_2683"
            x="-4"
            y="-4"
            width="92"
            height="92"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.211765 0 0 0 0 0.658824 0 0 0 0 0.203922 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_208_2683"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="8" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0509804 0 0 0 0 0.0666667 0 0 0 0 0.0313726 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_208_2683"
              result="effect2_dropShadow_208_2683"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_208_2683"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }
}
