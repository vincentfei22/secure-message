import { useEffect, useRef } from 'react';

interface TextFieldProps {
    label?: string;
    name: string;
    placeholder: string;
    autoComplete?: string;
    infos?: string;
    value?: string;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    focus?: boolean;
    disabled?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
    label,
    name,
    autoComplete,
    placeholder,
    infos,
    value,
    handleChange,
    type = "text",
    required = false,
    focus = false,
    disabled = false,
}) => {
    // Define input reference
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle the focus effect
    useEffect(() => {
        const isFocusEnabled = focus;
        if (isFocusEnabled && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focus]);

    // Define classNames for input
    const inputBaseClass = "th-bg-bg th-border-brblack th-color-for th-border- mt-2 focus:ring-indigo-400 focus:border-indigo-500 block w-full shadow-sm text-base rounded disabled:opacity-50";
    const inputLabelClass = "block text-sm font-bold th-color-for";
    const infoTextClass = "text-xs font-normal mt-2 th-color-for";

    // Render the TextField component
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className={inputLabelClass}>
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                required={required}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={value}
                onChange={handleChange}
                ref={inputRef}
                disabled={disabled}
                className={inputBaseClass}
            />
            {infos && <div className={infoTextClass}>{infos}</div>}
        </div>
    );
};

export default TextField;
