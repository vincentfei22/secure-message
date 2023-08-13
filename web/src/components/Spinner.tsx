import React from "react";
import classNames from "utils/classNames";

interface SpinnerProps {
    className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
    // Define basic spinner properties
    const spinnerAnimationClass = "animate-spin";
    const spinnerHeightClass = "h-4";
    const spinnerWidthClass = "w-4";
    const spinnerColorClass = "th-color-for";
    const combinedSpinnerClassNames = classNames(spinnerAnimationClass, spinnerHeightClass, spinnerWidthClass, spinnerColorClass, className);

    // Define SVG properties
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svgFill = "none";
    const svgViewBox = "0 0 24 24";

    // Define circle properties for the spinner
    const circleOpacity = "opacity-25";
    const circleCenterX = "12";
    const circleCenterY = "12";
    const circleRadius = "10";
    const circleStroke = "currentColor";
    const circleStrokeWidth = "4";

    // Define path properties for the spinner
    const pathOpacity = "opacity-75";
    const pathFill = "currentColor";
    const pathData = "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z";

    // Render the spinner
    return (
        <svg
            className={combinedSpinnerClassNames}
            xmlns={svgNamespace}
            fill={svgFill}
            viewBox={svgViewBox}
        >
            <circle
                className={circleOpacity}
                cx={circleCenterX}
                cy={circleCenterY}
                r={circleRadius}
                stroke={circleStroke}
                strokeWidth={circleStrokeWidth}
            />
            <path
                className={pathOpacity}
                fill={pathFill}
                d={pathData}
            />
        </svg>
    );
};

export default Spinner;
