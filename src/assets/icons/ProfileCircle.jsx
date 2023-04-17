export function ProfileCircle(props) {
  const { color = "#999", size = "21" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 21 20">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          d="M10.6 10.65a.806.806 0 00-.2 0 2.724 2.724 0 01-2.633-2.725A2.73 2.73 0 0110.5 5.192a2.73 2.73 0 01.1 5.458zM16.117 16.15a8.279 8.279 0 01-5.617 2.183 8.279 8.279 0 01-5.617-2.183c.084-.783.584-1.55 1.475-2.15 2.284-1.517 6.017-1.517 8.284 0 .891.6 1.391 1.367 1.475 2.15z"></path>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          d="M10.5 18.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666z"></path>
      </svg>
    </span>
  );
}
