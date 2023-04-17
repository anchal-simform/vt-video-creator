export function Shapes(props) {
  const { color = "#1F2D3A", size = "30" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 31 30">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.875"
          d="M17.288 18.75H6c-2.275 0-3.725-2.438-2.625-4.438l2.912-5.3L9.012 4.05c1.138-2.063 4.113-2.063 5.25 0L17 9.012l1.313 2.388 1.6 2.912c1.1 2-.35 4.438-2.625 4.438z"></path>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.875"
          d="M28 19.375a8.125 8.125 0 01-8.125 8.125 8.125 8.125 0 01-8.125-8.125c0-.212.012-.413.025-.625h5.513c2.274 0 3.724-2.438 2.625-4.438l-1.6-2.912A8.125 8.125 0 0128 19.375z"></path>
      </svg>
    </span>
  );
}
