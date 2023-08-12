import React from "react";

interface CancelButtonProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CancelButton({ setOpen }: CancelButtonProps) {
    const handleClick = () => setOpen(false);

    return (
        <button
            type="button"
            className="th-bg-selbg th-color-for w-full inline-flex justify-center py-2 px-4 text-base font-bold rounded focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleClick}
        >
            Cancel
        </button>
    );
}
