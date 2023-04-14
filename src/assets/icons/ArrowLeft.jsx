export function ArrowLeft(props) {
  const { color = "#999", size = "24" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="M9.57 5.93L3.5 12l6.07 6.07M20.5 12H3.67"></path>
      </svg>
    </span>
  );
}
