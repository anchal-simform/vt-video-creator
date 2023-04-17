export function Underline(props) {
    const { color = "#999", size = "20" } = props;
    return (
      <span className="icon-wrap">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.167 17.5h11.666M4.167 2.5v5.833A5.83 5.83 0 0010 14.167a5.83 5.83 0 005.833-5.834V2.5"
      ></path>
    </svg>
      </span>
    );
  }
  