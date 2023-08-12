export default function AuthButton({
    isSubmitting,
    text,
}: {
    isSubmitting: boolean;
    text: string;
}) {
    // Define class names for the button
    const buttonClassNames = "th-bg-blue th-color-brwhite group relative w-full flex items-center justify-center py-2 px-4 border border-transparent text-base font-bold rounded focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50";

    // Define class names for the spinner
    const spinnerClassNames = "animate-spin -ml-1 mr-2 h-4 w-4 th-color-brwhite";

    // Define the spinner SVG properties
    const spinnerSvgProps = {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24"
    };

    // Define the spinner circle properties
    const spinnerCircleProps = {
        className: "opacity-25",
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        strokeWidth: "4"
    };

    // Define the spinner path properties
    const spinnerPathProps = {
        className: "opacity-75",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    };

    return (
        <button type="submit" disabled={isSubmitting} className={buttonClassNames}>
            {isSubmitting && (
                <svg className={spinnerClassNames} {...spinnerSvgProps}>
                    <circle {...spinnerCircleProps} />
                    <path {...spinnerPathProps} />
                </svg>
            )}
            {text}
        </button>
    );
}
