import React from "react";

interface StyleProps {
    css: string;
}

const Style: React.FC<StyleProps> = ({ css }) => {
    // Define properties for dangerouslySetInnerHTML
    const innerHtmlContent = { __html: css };

    // Render the style component
    return (
        <style dangerouslySetInnerHTML={innerHtmlContent} />
    );
};

export default Style;
