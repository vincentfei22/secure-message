import LoadingScreen from "components/LoadingScreen";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { user, isInitialized, isAuthenticated } = useAuth();

    // Verbose checks for initialization and authentication
    const isUserInitialized = isInitialized;
    const isUserAuthenticated = isAuthenticated;

    // Define local storage keys
    const themeLocalStorageKey = "theme";
    const backgroundColorLocalStorageKey = "backgroundColor";

    // useEffect hook logic breakdown
    useEffect(() => {
        if (isUserInitialized && !isUserAuthenticated) {
            localStorage.removeItem(themeLocalStorageKey);
            localStorage.removeItem(backgroundColorLocalStorageKey);
        }
    }, [user, isUserInitialized, isUserAuthenticated]);

    // Check for user initialization
    if (!isUserInitialized) {
        const loadingScreenComponent = <LoadingScreen />;
        return loadingScreenComponent;
    }

    // Check for user authentication
    if (!isUserAuthenticated) {
        const loginRoutePath = "/authentication/login";
        const navigateToLoginComponent = <Navigate to={loginRoutePath} />;
        return navigateToLoginComponent;
    }

    // If user is authenticated, render the children components
    const childrenComponents = <>{children}</>;
    return childrenComponents;
}
