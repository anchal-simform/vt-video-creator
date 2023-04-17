export function Play(props) {
  const { color = "#1F2D3A", size = "18" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 18 18">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.125"
          d="M3 9V6.33c0-3.315 2.348-4.672 5.22-3.015l2.317 1.335 2.318 1.335c2.872 1.658 2.872 4.372 0 6.03l-2.318 1.335-2.317 1.335C5.347 16.343 3 14.985 3 11.67V9z"></path>
      </svg>
    </span>
  );
}
