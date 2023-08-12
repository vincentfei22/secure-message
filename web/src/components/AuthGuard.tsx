import LoadingScreen from "components/LoadingScreen";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { user, isInitialized, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isInitialized && !isAuthenticated) {
            localStorage.removeItem("theme");
            localStorage.removeItem("backgroundColor");
        }
    }, [user, isInitialized, isAuthenticated]);

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/authentication/login" />;
    }

    return <>{children}</>;
}
