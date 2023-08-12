import LoadingScreen from "components/LoadingScreen";
import useAuth from "hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

interface GuestGuardProps {
    children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
    const { isInitialized, isAuthenticated } = useAuth();

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return <>{children}</>;
}
