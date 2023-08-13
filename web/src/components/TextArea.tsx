import { useEffect, useRef } from 'react';

interface TextAreaProps {
    label?: string;
    name: string;
    placeholder: string;
    autoComplete?: string;
    infos?: string;
    value: string;
    handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    focus?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
    label,
    name,
    autoComplete,
    placeholder,
    infos,
    value,
    handleChange,
    focus = false,
}) => {
    // Define input reference
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Handle the focus effect
    useEffect(() => {
        const isFocusEnabled = focus;
        if (isFocusEnabled && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focus]);

    // Define classNames for textarea
    const textAreaBaseClass = "th-bg-bg th-border-brblack th-color-for mt-2 focus:ring-indigo-400 focus:border-indigo-500 block w-full shadow-sm text-sm rounded-md h-28 resize-none";
    const textAreaLabelClass = "block text-sm font-bold th-color-for";
    const infoTextClass = "text-xs font-normal mt-2 th-color-for";

    // Render the TextArea component
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className={textAreaLabelClass}>
                    {label}
                </label>
            )}
            <textarea
                value={value}
                name={name}
                id={name}
                ref={inputRef}
                onChange={handleChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={textAreaBaseClass}
            />
            {infos && <div className={infoTextClass}>{infos}</div>}
        </div>
    );
};

export default TextArea;
