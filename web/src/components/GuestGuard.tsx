import LoadingScreen from "components/LoadingScreen";
import useAuth from "hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

interface GuestGuardProps {
    children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
    const { isInitialized, isAuthenticated } = useAuth();

    // Verbose checks for initialization and authentication
    const isUserInitialized = isInitialized;
    const isUserAuthenticated = isAuthenticated;

    // Define dashboard route path
    const dashboardRoutePath = "/dashboard";

    // Check for user initialization
    if (!isUserInitialized) {
        const loadingScreenComponent = <LoadingScreen />;
        return loadingScreenComponent;
    }

    // Check for user authentication
    if (isUserAuthenticated) {
        const navigateToDashboardComponent = <Navigate to={dashboardRoutePath} />;
        return navigateToDashboardComponent;
    }

    // If user is not authenticated, render the children components
    const childrenComponents = <>{children}</>;
    return childrenComponents;
}
