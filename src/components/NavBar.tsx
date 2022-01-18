import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Logo = () => (
  <svg
    color="white"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 110 20"
    role="presentation"
    aria-hidden="true"
    data-testid="zoopla-logo"
    className="fill-[#8046F1] w-[110px] h-[32px]"
  >
    <path d="M100.02 16.06c-3.27 0-5.82-2.28-5.82-6.06 0-3.68 2.41-6.09 5.82-6.09 3.6 0 5.98 2.63 5.98 6.12a5.76 5.76 0 01-5.98 6.03zM78.7 19.44h11.29v-3.57h-7.3V.56h-4v18.88zM68.29 12.5a4.18 4.18 0 01-4.35-4.37 4.22 4.22 0 014.35-4.37c2.55 0 4.42 1.72 4.42 4.37 0 2.66-1.87 4.37-4.42 4.37zm-8.34 6.95h4v-6.76a5.94 5.94 0 005.5 3.36c3.94 0 7.24-3.25 7.24-7.92S73.39.18 69.44.18c-2.41 0-4.4 1.2-5.5 3.36v-3h-4v18.9zm-11.78-3.32c-3.33 0-5.93-2.4-5.93-6.07 0-3.7 2.6-6.2 5.93-6.2 3.33 0 5.87 2.5 5.87 6.2 0 3.68-2.54 6.07-5.87 6.07zm.03 3.7c5.71 0 9.87-3.97 9.87-9.77 0-5.79-4.16-9.87-9.87-9.87-5.72 0-9.95 4.08-9.95 9.87 0 5.8 4.23 9.77 9.95 9.77zm-21.44-3.7c-3.32 0-5.9-2.4-5.9-6.07 0-3.7 2.58-6.2 5.9-6.2 3.33 0 5.9 2.5 5.9 6.2 0 3.68-2.57 6.07-5.9 6.07zm.03 3.7c5.71 0 9.87-3.97 9.87-9.77 0-5.79-4.15-9.87-9.87-9.87-5.71 0-9.95 4.08-9.95 9.87 0 5.8 4.24 9.77 9.95 9.77zM.48 19.44h15.5v-3.57H4.77c.1-2.81 2.12-3.56 4.4-4.34 3.14-1.07 6.76-2.44 6.76-9.55V.56H.53V4.1h11.16c-.1 2.65-2.07 3.35-4.3 4.1C4.24 9.28.49 10.64.49 18v1.44zm98.82.38a7.53 7.53 0 006.7-3.65v3.27h4V.56h-4V3.8A7.51 7.51 0 0099.3.18c-5 0-9.12 4.1-9.12 9.82 0 5.72 4.13 9.82 9.12 9.82z"></path>
  </svg>
);

const NavBar = () => {
  return (
    <header className="flex flex-row h-14 w-full content-center justify-between px-6 bg-slate-200 dark:bg-slate-700 shadow-md shadow-slate-300 dark:shadow-gray-800">
      <div className="flex items-center">
        <Link to="/">
          <Logo />
        </Link>
        <div className="inline-flex items-center mx-2 md:mx-5">
          <h1 className="text-base md:text-lg">
            <Link to="/rent">To rent</Link>
          </h1>
        </div>
        <div className="flex items-center mx-2 md:mx-5">
          <h1 className="text-base md:text-lg">
            <Link to="/sale">For sale</Link>
          </h1>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default NavBar;
