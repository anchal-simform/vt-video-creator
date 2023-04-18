export function InfoCircle(props) {
  const { color = "#1F2D3A", size = "24" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zM12 8v5"></path>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.995 16h.009"></path>
      </svg>
    </span>
  );
}
