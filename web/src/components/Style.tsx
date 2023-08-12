import React from "react";

interface StyleProps {
    css: string;
}

const Style: React.FC<StyleProps> = ({ css }) => (
    <style dangerouslySetInnerHTML={{ __html: css }} />
);

export default Style;
