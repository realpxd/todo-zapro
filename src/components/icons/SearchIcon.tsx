import React from "react";

function SearchIcon({light}: {light: boolean}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={light ? "#000" : "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 6a5 5 0 015 5m.659 5.655L21 21m-2-10a8 8 0 11-16 0 8 8 0 0116 0z"
      ></path>
    </svg>
  );
}

export default SearchIcon;
