import {
  Context,
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from "react";

interface Theme {
  isDark: boolean;
}

interface ThemeContext {
  theme: Theme;
  dispatch: Dispatch<boolean>;
}

interface Props {
  children: JSX.Element;
}

const LIGHT_THEME: Theme = {
  isDark: false,
};

const DARK_THEME: Theme = {
  isDark: true,
};

const themeFromLocalStorage = localStorage.getItem("theme");

const defaultState =
  typeof window !== "undefined" && themeFromLocalStorage !== "undefined"
    ? JSON.parse(window.localStorage.getItem("theme") as string)
    : LIGHT_THEME;

const themeReducer = (_: any, isDark: boolean) => {
  return isDark ? DARK_THEME : LIGHT_THEME;
};

const ThemeContext: Context<ThemeContext> = createContext({} as ThemeContext);

export const ThemeProvider = ({ children }: Props) => {
  const [theme, dispatch] = useReducer(themeReducer, defaultState);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme.isDark));
    if (
      localStorage.theme === "true" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
