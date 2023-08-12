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
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (focus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focus]);

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-bold th-color-for">
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
                className="th-bg-bg th-border-brblack th-color-for th-border- mt-2 focus:ring-indigo-400 focus:border-indigo-500 block w-full shadow-sm text-base rounded disabled:opacity-50"
            />
            {infos && <div className="text-xs font-normal mt-2 th-color-for">{infos}</div>}
        </div>
    );
};

export default TextField;
