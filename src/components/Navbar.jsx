import React from "react";
import Title from "./Title";

const navbar = () => {
  return (
    <nav className="bg-black flex justify-between items-center px-4 h-16">
      {/* <div className="logo font-bold text-white">YPM</div> */}
      <Title />
      <ul>
        <li className="flex gap-4">
          <a className="hover:font-bold text-white" href="#">
            Home
          </a>
          <a className="hover:font-bold text-white" href="#">
            About
          </a>
          <a className="hover:font-bold text-white" href="#">
            Contact
          </a>
        </li>
      </ul>
      <button>
        <img className="invert p-5 w-16" src="/image/25231.png" alt="git" />
      </button>
    </nav>
  );
};

export default navbar;
