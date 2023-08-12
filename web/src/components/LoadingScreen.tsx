import Spinner from "components/Spinner";
import React from "react";

const LoadingScreen: React.FC = () => (
    <div className="h-screen w-screen flex items-center justify-center th-bg-bg">
        <Spinner className="h-6 w-6 th-color-for" />
    </div>
);

export default LoadingScreen;
