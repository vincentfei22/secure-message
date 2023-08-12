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
    const inputRef = useRef<HTMLTextAreaElement>(null);

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
            <textarea
                value={value}
                name={name}
                id={name}
                ref={inputRef}
                onChange={handleChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="th-bg-bg th-border-brblack th-color-for mt-2 focus:ring-indigo-400 focus:border-indigo-500 block w-full shadow-sm text-sm rounded-md h-28 resize-none"
            />
            {infos && <div className="text-xs font-normal mt-2 th-color-for">{infos}</div>}
        </div>
    );
};

export default TextArea;
