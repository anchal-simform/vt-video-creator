export function UserCircle(props) {
  const { color = "#1F2D3A", size = "17" } = props;
  return (
    <span className="icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 17 17">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.063"
          d="M8.117 9.725a1.99 1.99 0 100-3.98 1.99 1.99 0 000 3.98zM11.794 14.308c0-1.65-1.644-2.996-3.677-2.996-2.033 0-3.676 1.339-3.676 2.996"></path>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.063"
          d="M14.875 8.854c0 3.719-3.01 6.73-6.73 6.73a6.726 6.726 0 01-6.728-6.73c0-3.719 3.01-6.729 6.729-6.729.928 0 1.813.184 2.62.524-.091.283-.14.581-.14.893 0 .53.148 1.034.41 1.459.142.24.326.46.538.644a2.777 2.777 0 002.77.581c.34.808.531 1.7.531 2.628z"></path>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.063"
          d="M16.292 3.542c0 .226-.029.446-.085.658-.064.284-.177.56-.326.8a2.761 2.761 0 01-1.537 1.226 2.777 2.777 0 01-2.77-.58A2.61 2.61 0 0111.036 5a2.778 2.778 0 01-.411-1.46c0-.311.05-.608.142-.892A2.83 2.83 0 0113.459.71c.835 0 1.593.36 2.103.941.453.503.73 1.17.73 1.892zM14.514 3.527h-2.111M13.458 2.493v2.118"></path>
      </svg>
    </span>
  );
}
