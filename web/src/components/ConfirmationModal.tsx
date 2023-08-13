import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import CancelButton from "components/CancelButton";
import ModalButton from "components/dashboard/ModalButton";
import React, { Fragment, useState } from "react";

interface ConfirmationModalProps {
    title: string;
    text: string;
    onConfirm: any;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmationModal({
    title,
    text,
    onConfirm,
    open,
    setOpen,
}: ConfirmationModalProps) {
    // State for loading
    const initialLoadingState = false;
    const [loadingState, setLoadingState] = useState(initialLoadingState);

    // Define modal properties
    const modalOverlayColorClass = "fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity";
    const modalContentWrapperClass = "th-bg-bg inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full";
    const modalHeaderClass = "th-bg-bg p-6 pb-4 flex justify-between items-center";
    const modalTitleClass = "font-bold text-2xl th-color-for";
    const closeButtonClass = "cursor-pointer focus:outline-none";
    const modalBodyClass = "p-6 pt-0 pb-4 th-color-for th-bg-bg";
    const modalFooterClass = "px-4 pb-5 pt-1 sm:px-6 sm:flex sm:flex-row-reverse";

    // Handle confirm action breakdown
    const handleConfirmationAction = async () => {
        setLoadingState(true);
        await onConfirm();
        setLoadingState(false);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                open={open}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className={modalOverlayColorClass} />
                    </Transition.Child>

                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className={modalContentWrapperClass}>
                            <div className={modalHeaderClass}>
                                <h5 className={modalTitleClass}>{title}</h5>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    className={closeButtonClass}
                                    onClick={() => setOpen(false)}
                                >
                                    <XIcon className="h-5 w-5 th-color-for" />
                                </div>
                            </div>
                            <div className={modalBodyClass}>{text}</div>
                            <div className={modalFooterClass}>
                                <ModalButton
                                    text="Confirm"
                                    onClick={handleConfirmationAction}
                                    isSubmitting={loadingState}
                                />
                                <CancelButton setOpen={setOpen} />
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
