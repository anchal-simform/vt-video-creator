export function Bucket(props) {
  const { color = "#1F2D3A", size = "30" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 31 30">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.875"
          d="M9.262 22.5L4.25 17.488c-1.675-1.675-1.675-3.338 0-5.013l8.35-8.35 9.188 9.188a1.184 1.184 0 010 1.675l-7.526 7.524c-1.65 1.65-3.325 1.65-5-.012zM10.938 2.438l1.675 1.674M3.088 14.9l18.9-.825M4.25 27.5H20.5"></path>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.875"
          d="M24.063 18.75s-2.313 2.512-2.313 4.05a2.315 2.315 0 002.313 2.313 2.315 2.315 0 002.312-2.313c0-1.538-2.313-4.05-2.313-4.05z"></path>
      </svg>
    </span>
  );
}
