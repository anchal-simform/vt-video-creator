export function ArrowDown(props) {
  const { color = "#171725" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" fill="none" viewBox="0 0 14 9">
        <path
          fill={color}
          d="M.725 1.141a.625.625 0 01.814-.06l.07.06L7 6.533l5.392-5.392a.625.625 0 01.813-.06l.07.06c.222.222.242.57.06.814l-.06.07L7.442 7.86a.625.625 0 01-.814.06l-.07-.06L.725 2.025a.625.625 0 010-.884z"></path>
      </svg>
    </span>
  );
}
