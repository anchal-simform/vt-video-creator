export function Undo(props) {
  const { color = "#292D32", size = "24" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="M7.13 18.31h8c2.76 0 5-2.24 5-5s-2.24-5-5-5h-11"></path>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.43 10.81L3.87 8.25l2.56-2.56"></path>
      </svg>
    </span>
  );
}
