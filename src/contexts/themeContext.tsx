import { Context, createContext, useEffect, useState } from "react";

interface ThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

interface Props {
  children: JSX.Element;
}

const ThemeContext: Context<ThemeContext> = createContext({} as ThemeContext);

export const ThemeContextProvider = ({ children }: Props) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark") === "true"
  );

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const contextValue = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
