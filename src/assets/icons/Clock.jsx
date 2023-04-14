export function Clock(props) {
  const { color = "#292D32", size = "24" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z"></path>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15.71 15.18l-3.1-1.85c-.54-.32-.98-1.09-.98-1.72v-4.1"></path>
      </svg>
    </span>
  );
}
