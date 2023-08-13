import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import ModalButton from "components/dashboard/ModalButton";
import TextField from "components/TextField";
import { Formik } from "formik";
import { useChannelById } from "hooks/useChannels";
import React, { Fragment, useRef } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { postData } from "utils/api-helpers";
import * as Yup from "yup";

export default function AddPeopleToChannelDialog({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const cancelButtonRef = useRef(null);
    const { channelId } = useParams();
    const { value: channel } = useChannelById(channelId);
    
    const dialogClass = ["fixed", "z-10", "inset-0", "overflow-y-auto"].join(" ");
    const modalClass = [
      "th-bg-bg",
      "inline-block",
      "align-bottom",
      "rounded-lg",
      "text-left",
      "overflow-hidden",
      "shadow-xl",
      "transform",
      "transition-all",
      "sm:my-8",
      "sm:align-middle",
      "sm:max-w-lg",
      "sm:w-full",
    ].join(" ");
    const formInitialValues = { email: "" };    
    const formValidationSchema = Yup.object().shape({
        email: Yup.string().email().max(255).required(),
    });

    const onSubmitForm = async (
        { email }: { email: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setSubmitting(true);
        try {
          const postDataEndpoint = `/channels/${channelId}/members`;
          const postDataBody = { email };
          await postData(postDataEndpoint, postDataBody);
          const successMessage = "Member added.";
          toast.success(successMessage);
          setOpen(false);
        } catch (err: any) {
          const errorMessage = err.message;
          toast.error(errorMessage);
        } finally {
          setSubmitting(false);
        }
        
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className={dialogClass}
                initialFocus={cancelButtonRef}
                open={open}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className={modalClass}>
                            <div className="th-bg-bg px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex justify-between items-center">
                                <div>
                                    <h5 className="font-bold text-2xl th-color-for">Add member</h5>
                                    <span className="opacity-70 text-sm th-color-for">{`#${channel?.name}`}</span>
                                </div>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    className="cursor-pointer focus:outline-none"
                                    onClick={() => setOpen(false)}
                                >
                                    <XIcon className="h-5 w-5 th-color-for" />
                                </div>
                            </div>
                            <Formik
                                initialValues={formInitialValues}
                                enableReinitialize
                                validationSchema={formValidationSchema}
                                onSubmit={onSubmitForm}
                            >
                                {({ values, handleChange, isSubmitting, handleSubmit }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <div className="bg-white p-6 pt-0 pb-6 th-bg-bg">
                                            <div className="space-y-6">
                                                <TextField
                                                    name="email"
                                                    type="email"
                                                    focus
                                                    value={values.email}
                                                    handleChange={handleChange}
                                                    placeholder="name@email.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="px-4 pb-5 pt-1 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <ModalButton isSubmitting={isSubmitting} text="Done" />
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
};
