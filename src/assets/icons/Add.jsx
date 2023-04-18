export function Add(props) {
  const { color = "#0693E3", size = "30" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 30 30">
        <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" d="M7.5 15h15M15 22.5v-15"></path>
      </svg>
    </span>
  );
}
