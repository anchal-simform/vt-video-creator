export function Gallery(props) {
  const { color = "#1F2D3A", size = "30" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 30 30">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.875"
          d="M11.25 27.5h7.5c6.25 0 8.75-2.5 8.75-8.75v-7.5C27.5 5 25 2.5 18.75 2.5h-7.5C5 2.5 2.5 5 2.5 11.25v7.5C2.5 25 5 27.5 11.25 27.5z"></path>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.875"
          d="M11.25 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3.337 23.688L9.5 19.55c.988-.662 2.412-.587 3.3.175l.412.363c.976.837 2.55.837 3.526 0l5.2-4.463c.975-.837 2.55-.837 3.524 0l2.038 1.75"></path>
      </svg>
    </span>
  );
}
