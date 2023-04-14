export function Redo(props) {
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
          d="M16.87 18.31h-8c-2.76 0-5-2.24-5-5s2.24-5 5-5h11"></path>
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.57 10.81l2.56-2.56-2.56-2.56"></path>
      </svg>
    </span>
  );
}
