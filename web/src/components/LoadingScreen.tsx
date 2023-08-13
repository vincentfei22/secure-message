import Spinner from "components/Spinner";
import React from "react";

const LoadingScreen: React.FC = () => {
    // Define spinner properties
    const spinnerHeightClass = "h-6";
    const spinnerWidthClass = "w-6";
    const spinnerColorClass = "th-color-for";
    const combinedSpinnerClassNames = `${spinnerHeightClass} ${spinnerWidthClass} ${spinnerColorClass}`;

    // Define loading screen properties
    const loadingScreenHeightClass = "h-screen";
    const loadingScreenWidthClass = "w-screen";
    const loadingScreenFlexProperties = "flex items-center justify-center";
    const loadingScreenBackgroundColorClass = "th-bg-bg";
    const combinedLoadingScreenClassNames = `${loadingScreenHeightClass} ${loadingScreenWidthClass} ${loadingScreenFlexProperties} ${loadingScreenBackgroundColorClass}`;

    // Render the loading screen
    return (
        <div className={combinedLoadingScreenClassNames}>
            <Spinner className={combinedSpinnerClassNames} />
        </div>
    );
};

export default LoadingScreen;
