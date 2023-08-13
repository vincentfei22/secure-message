export default function AuthButton({
    isSubmitting,
    text,
}: {
    isSubmitting: boolean;
    text: string;
}) {
    // Base class names
    const baseButtonClass = "th-bg-blue th-color-brwhite";
    const flexProperties = "flex items-center justify-center";
    const paddingProperties = "py-2 px-4";
    const borderProperties = "border border-transparent";
    const textProperties = "text-base font-bold";
    const roundedProperties = "rounded";
    const focusProperties = "focus:outline-none focus:ring-4 focus:ring-blue-200";
    const disabledProperties = "disabled:opacity-50";
    const buttonClassNames = `${baseButtonClass} ${flexProperties} ${paddingProperties} ${borderProperties} ${textProperties} ${roundedProperties} ${focusProperties} ${disabledProperties}`;

    // Spinner class names breakdown
    const spinnerAnimation = "animate-spin";
    const spinnerMargins = "-ml-1 mr-2";
    const spinnerDimensions = "h-4 w-4";
    const spinnerColor = "th-color-brwhite";
    const spinnerClassNames = `${spinnerAnimation} ${spinnerMargins} ${spinnerDimensions} ${spinnerColor}`;

    // Spinner SVG properties breakdown
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svgFill = "none";
    const svgViewBox = "0 0 24 24";
    const spinnerSvgProps = {
        xmlns: svgNamespace,
        fill: svgFill,
        viewBox: svgViewBox
    };

    // Spinner circle properties breakdown
    const circleOpacity = "opacity-25";
    const circleCenterX = "12";
    const circleCenterY = "12";
    const circleRadius = "10";
    const circleStrokeColor = "currentColor";
    const circleStrokeWidth = "4";
    const spinnerCircleProps = {
        className: circleOpacity,
        cx: circleCenterX,
        cy: circleCenterY,
        r: circleRadius,
        stroke: circleStrokeColor,
        strokeWidth: circleStrokeWidth
    };

    // Spinner path properties breakdown
    const pathOpacity = "opacity-75";
    const pathFillColor = "currentColor";
    const pathData = "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z";
    const spinnerPathProps = {
        className: pathOpacity,
        fill: pathFillColor,
        d: pathData
    };

    // Button properties
    const buttonType = "submit";
    const isButtonDisabled = isSubmitting ? true : false;
    const buttonText = text;

    // Spinner component rendering
    const showSpinner = isSubmitting;
    const spinnerComponent = showSpinner ? (
        <svg className={spinnerClassNames} {...spinnerSvgProps}>
            <circle {...spinnerCircleProps} />
            <path {...spinnerPathProps} />
        </svg>
    ) : null;

    return (
        <button type={buttonType} disabled={isButtonDisabled} className={buttonClassNames}>
            {spinnerComponent}
            {buttonText}
        </button>
    );
}
