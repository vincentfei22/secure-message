import React from "react";

interface CancelButtonProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CancelButton({ setOpen }: CancelButtonProps) {
    // Breakdown the button type
    const buttonTypeDefinition = "button";

    // Define button class names individually
    const buttonBackgroundColorClass = "th-bg-selbg";
    const buttonTextColorClass = "th-color-for";
    const buttonWidthClass = "w-full";
    const buttonFlexProperties = "inline-flex justify-center";
    const buttonPaddingProperties = "py-2 px-4";
    const buttonTextProperties = "text-base font-bold";
    const buttonShapeProperties = "rounded";
    const buttonFocusProperties = "focus:outline-none focus:ring-0";
    const buttonResponsiveProperties = "sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm";

    // Combine all button class names
    const combinedButtonClassNames = `${buttonBackgroundColorClass} ${buttonTextColorClass} ${buttonWidthClass} ${buttonFlexProperties} ${buttonPaddingProperties} ${buttonTextProperties} ${buttonShapeProperties} ${buttonFocusProperties} ${buttonResponsiveProperties}`;

    // Define button text
    const buttonTextContent = "Cancel";

    // Handle click function breakdown
    const closeStateValue = false;
    const handleClick = () => setOpen(closeStateValue);

    // Render the button
    return (
        <button
            type={buttonTypeDefinition}
            className={combinedButtonClassNames}
            onClick={handleClick}
        >
            {buttonTextContent}
        </button>
    );
}
