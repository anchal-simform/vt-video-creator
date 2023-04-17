export function Download(props) {
  const { color = "#0693E3", size = "30" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 30 30">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.875"
          d="M11.25 13.75v7.5l2.5-2.5M11.25 21.25l-2.5-2.5"></path>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.875"
          d="M27.5 12.5v6.25c0 6.25-2.5 8.75-8.75 8.75h-7.5C5 27.5 2.5 25 2.5 18.75v-7.5C2.5 5 5 2.5 11.25 2.5h6.25"></path>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" d="M27.5 12.5h-5c-3.75 0-5-1.25-5-5v-5l10 10z"></path>
      </svg>
    </span>
  );
}
