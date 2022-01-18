import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import ThemeContext from "../contexts/themeContext";

const ThemeToggle = () => {
  const theme = useContext(ThemeContext);

  return (
    <button onClick={() => toggleTheme(theme)}>
      {theme.theme.isDark ? (
        <FaSun className="text-2xl cursor-pointer text-gray-600 dark:text-yellow-400" />
      ) : (
        <FaMoon className="text-2xl cursor-pointer text-blue-900 dark:text-gray-400" />
      )}
    </button>
  );
};

const toggleTheme = (theme: ThemeContext) => {
  const isDark = theme.theme.isDark;
  theme.dispatch(!isDark);
};

export default ThemeToggle;
