export function Archive(props) {
  const { color = "#1F2D3A", size = "24" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"></path>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M18 7.75v6.75c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2V7.75c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2zM19 15.75h-1M6 15.75H5"></path>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 14v-3c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3"></path>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M18 14.5v1.25h-3.5a2.5 2.5 0 01-5 0H6V14.5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2z"></path>
      </svg>
    </span>
  );
}
