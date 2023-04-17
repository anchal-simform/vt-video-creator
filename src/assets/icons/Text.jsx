export function Text(props) {
  const { color = "#292D32", size = "30" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 30 30">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.875"
          d="M3.337 8.963V6.688A2.585 2.585 0 015.925 4.1h18.15a2.585 2.585 0 012.588 2.588v2.275M15 25.9V5.137M10.075 25.9h9.85"></path>
      </svg>
    </span>
  );
}
