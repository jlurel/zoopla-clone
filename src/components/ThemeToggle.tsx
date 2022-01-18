import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import ThemeContext from "../contexts/themeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  console.log("Dark: ", isDark);

  return (
    <button onClick={() => toggleTheme()}>
      {isDark ? (
        <FaSun className="text-2xl cursor-pointer text-gray-600 dark:text-yellow-400" />
      ) : (
        <FaMoon className="text-2xl cursor-pointer text-blue-900 dark:text-gray-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
