import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Formik, FormikHelpers } from "formik";
import useAuth from "hooks/useAuth";
import { updateUser } from "gqlite-lib/dist/client/auth";
import toast from "react-hot-toast";
import { useRef, Fragment } from "react";
import { useModal } from "contexts/ModalContext";
import TextField from "components/TextField";
import CancelButton from "components/CancelButton";
import ModalButton from "components/dashboard/ModalButton";

interface FormValues {
    newPassword: string;
    newPasswordConfirm: string;
}

export default function EditPasswordModal() {
    const { user } = useAuth();
    const cancelButtonRef = useRef(null);
    const { openEditPassword: open, setOpenEditPassword: setOpen } = useModal();

    const handleClose = () => setOpen(false);
    const handlePasswordUpdate = async (
        { newPassword, newPasswordConfirm }: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        setSubmitting(true);
        try {
            if (newPassword !== newPasswordConfirm)
                throw new Error("Passwords do not match");
            await updateUser(user.uid, { password: newPassword });
            setOpen(false);
        } catch (err: any) {
            toast.error(err.message);
        }
        setSubmitting(false);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
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
                        <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
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
                        <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full th-bg-bg">
                            <div className=" p-6 pb-4 flex justify-between items-center th-bg-bg">
                                <h5 className="font-bold text-2xl th-color-for">
                                    Change password
                                </h5>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    className="cursor-pointer focus:outline-none"
                                    onClick={handleClose}
                                >
                                    <XIcon className="h-5 w-5 th-color-for" />
                                </div>
                            </div>
                            <Formik
                                initialValues={{
                                    newPassword: "",
                                    newPasswordConfirm: "",
                                }}
                                onSubmit={handlePasswordUpdate}
                            >
                                {({ values, handleChange, isSubmitting, handleSubmit }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <div className="p-6 pt-0 pb-4 th-bg-bg">
                                            <div className="space-y-6 pt-2">
                                                <TextField
                                                    label="New password"
                                                    name="newPassword"
                                                    focus
                                                    type="password"
                                                    value={values.newPassword}
                                                    handleChange={handleChange}
                                                    placeholder=""
                                                />
                                                <TextField
                                                    label="Confirm new password"
                                                    name="newPasswordConfirm"
                                                    type="password"
                                                    value={values.newPasswordConfirm}
                                                    handleChange={handleChange}
                                                    placeholder=""
                                                />
                                            </div>
                                        </div>
                                        <div className="px-4 pb-5 pt-1 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <ModalButton isSubmitting={isSubmitting} text="Save" />
                                            <CancelButton setOpen={setOpen} />
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
