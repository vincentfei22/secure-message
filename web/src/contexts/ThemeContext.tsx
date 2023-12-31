import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import hexToRgbA from "utils/hexToRgbA";
import { postData } from "utils/api-helpers";
import { useUser } from "contexts/UserContext";
import { DEFAULT_THEME, THEMES_COUNT } from "config";
import Style from "components/Style";

export interface IColor {
    name: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    purple: string;
    cyan: string;
    white: string;
    brightBlack: string;
    brightRed: string;
    brightGreen: string;
    brightYellow: string;
    brightBlue: string;
    brightPurple: string;
    brightCyan: string;
    brightWhite: string;
    background: string;
    foreground: string;
    cursorColor: string;
    selectionBackground: string;
    messageFontWeight: "regular" | "light";
}

interface IThemeContext {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    themeColors: IColor | null;
}

export const ThemeContext = createContext<IThemeContext>({
    theme: "",
    setTheme: () => { },
    themeColors: null,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { userdata, user } = useUser();
    const initialTheme = localStorage.getItem("theme") || DEFAULT_THEME;
    const [theme, setTheme] = useState(initialTheme);
    const [themeColors, setThemeColors] = useState<IColor | null>(null);

    const themesList = useMemo(() =>
        Array.from(
            Array(THEMES_COUNT),
            (_, index) => `theme${index + 1 < 10 ? `0${index + 1}` : index + 1}`
        ),
        []
    );

    const updateThemeForUser = useCallback(() => {
        if (userdata?.objectId && (!userdata?.theme || !themesList.includes(userdata?.theme))) {
            postData(`/users/${userdata?.objectId}`, {
                theme: "theme01",
            });
        }
    }, [userdata, themesList]);

    const setThemeFromUserdata = useCallback(() => {
        if (userdata?.theme && themesList.includes(userdata?.theme)) {
            setTheme(userdata.theme);
        }
    }, [userdata, themesList]);

    const validateTheme = useCallback(() => {
        if (
            userdata?.objectId &&
            !themesList.includes(userdata?.theme) &&
            !themesList.includes(DEFAULT_THEME)
        ) {
            setTheme("theme01");
        } else if (
            user !== undefined &&
            user === null &&
            !themesList.includes(DEFAULT_THEME)
        ) {
            setTheme("theme01");
        }
    }, [userdata, user, themesList]);

    const updateBodyBackgroundColor = useCallback(() => {
        document.querySelector("body")!.style.backgroundColor = themeColors?.background || '';
        if (themeColors) localStorage.setItem("backgroundColor", themeColors.background);
    }, [themeColors]);

    const getThemeColors = useCallback(() => {
        fetch(`${process.env.PUBLIC_URL}/themes/${theme}.json`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setThemeColors(json);
            });
    }, [theme]);

    const updateLocalStorageTheme = useCallback(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(updateThemeForUser, [userdata?.objectId]);
    useEffect(setThemeFromUserdata, [userdata?.theme]);
    useEffect(validateTheme, [userdata, user]);
    useEffect(updateBodyBackgroundColor, [themeColors]);
    useEffect(getThemeColors, [theme]);
    useEffect(updateLocalStorageTheme, [theme]);

    const styleProps = {
        css: `
      .th-bg-bg {
        background-color: ${themeColors?.background};
      }
      .th-bg-for {
        background-color: ${themeColors?.foreground};
      }
      .th-bg-selbg {
        background-color: ${themeColors?.selectionBackground};
      }
      .th-bg-red {
        background-color: ${themeColors?.red};
      }
      .th-bg-brred {
        background-color: ${themeColors?.brightRed};
      }
      .th-bg-blue {
        background-color: ${themeColors?.blue};
      }
      .th-bg-blue-40 {
        background-color: ${hexToRgbA(themeColors?.blue, "0.4")};
      }
      .th-bg-brblue {
        background-color: ${themeColors?.brightBlue};
      }
      .th-bg-brwhite {
        background-color: ${themeColors?.brightWhite};
      }
      .th-bg-yellow {
        background-color: ${themeColors?.yellow};
      }
      .th-bg-cyan {
        background-color: ${themeColors?.cyan};
      }
      .th-bg-brpurple {
        background-color: ${themeColors?.brightPurple};
      }
      .th-bg-purple {
        background-color: ${themeColors?.purple};
      }
      .th-bg-green {
        background-color: ${themeColors?.green};
      }
      .th-border-bg {
        border-color: ${themeColors?.background};
      }
      .th-border-blue {
        border-color: ${themeColors?.blue};
      }
      .th-border-selbg {
        border-color: ${themeColors?.selectionBackground};
      }
      .th-border-for {
        border-color: ${themeColors?.foreground};
      }
      .th-border-brblack {
        border-color: ${themeColors?.brightBlack};
      }
      .th-color-bg {
        color: ${themeColors?.background};
      }
      .th-color-for {
        color: ${themeColors?.foreground};
      }
      .th-color-selbg {
        color: ${themeColors?.selectionBackground};
      }
      .th-color-blue {
        color: ${themeColors?.blue};
      }
      .th-color-red {
        color: ${themeColors?.red};
      }
      .th-color-brred {
        color: ${themeColors?.brightRed};
      }
      .th-color-brwhite {
        color: ${themeColors?.brightWhite};
      }
      .th-color-black {
        color: ${themeColors?.black};
      }
      .th-color-brblack {
        color: ${themeColors?.brightBlack};
      }
    `,
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
            <Style {...styleProps} />
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
