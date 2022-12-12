import React from "react";

/**
 * This component is the header of the application, with the logo of Company 6
 * and a title (displayed only on large screens)
 */
const Header = () => (
  <div className="flex flex-row justify-center items-center top-0 h-20 w-screen text-center border-b-2 border-solid border-b-gray-200">
    <img alt="logo" className="h-[3.5rem]" src="logo.png" />
    <div className="hidden sm:flex text-[2.5rem] ml-7">
      Calendrier des activités
    </div>
  </div>
);

export default Header;
