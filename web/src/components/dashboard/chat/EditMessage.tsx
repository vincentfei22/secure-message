import React, { useRef } from "react";
import { Formik } from "formik";
import toast from "react-hot-toast";

import QuillEditorEdit from "components/dashboard/quill/QuillEditorEdit";
import Spinner from "components/Spinner";
import { useTheme } from "contexts/ThemeContext";

import { MESSAGE_MAX_CHARACTERS } from "config";
import { postData } from "utils/api-helpers";
import { useForceUpdate } from "lib/hooks";

function EditMessageFooter({
    setEdit,
    isSubmitting,
    errors,
    dirty,
    editorRef,
}: {
    setEdit: any;
    isSubmitting: any;
    errors: any;
    dirty: any;
    editorRef: any;
}) {
    const { themeColors } = useTheme();

const editor = editorRef?.current?.getEditor();
const realText = editor?.getText() as string | null | undefined;
const isText = realText?.trim();

const hasTextError = errors.text && isText;

function getSubmitButtonBackgroundColor() {
    if (hasTextError) {
        return themeColors?.red;
    }
    return themeColors?.blue;
}

function getErrorSpan() {
    if (hasTextError) {
        return <span className="th-color-brwhite">{MESSAGE_MAX_CHARACTERS - isText.length}</span>;
    }
    return "Save";
}

const submitButtonStyle = {
    backgroundColor: getSubmitButtonBackgroundColor(),
};

return (
    <div className="flex items-center space-x-2 mt-1">
        <button
            type="button"
            className="border border-gray-500 font-medium th-bg-brwhite text-sm px-2 py-px rounded"
            onClick={() => setEdit(false)}
        >
            Cancel
        </button>
        <button
            className="border border-gray-500 font-medium flex items-center text-sm th-color-brwhite px-3 py-px rounded disabled:opacity-50"
            disabled={isSubmitting || !isText || !dirty}
            style={submitButtonStyle}
        >
            {isSubmitting ? <Spinner className="th-color-brwhite mr-2 h-3 w-3" /> : getErrorSpan()}
        </button>
    </div>
);

}

export default function EditMessage({
    message,
    setEdit,
}: {
    message: any;
    setEdit: React.Dispatch<React.SetStateAction<string>>;
}) {
    const forceUpdate = useForceUpdate();
    const editorRef = useRef<any>(null);

    const validate = () => {
        const errors: any = {};
        const editor = editorRef?.current?.getEditor();
        const realText = editor?.getText() as string | null | undefined;

        if (realText && realText.trim().length > MESSAGE_MAX_CHARACTERS)
            errors.text = `Message is too long. Max ${MESSAGE_MAX_CHARACTERS} characters.`;

        return errors;
    };

    return (
        <Formik
            initialValues={{
                text: message?.text,
            }}
            validate={validate}
            enableReinitialize
            onSubmit={async ({ text }, { setSubmitting }) => {
                setSubmitting(true);
                try {
                    const editor = editorRef?.current?.getEditor();
                    const realText = editor?.getText() as string | null | undefined;
                    if (!realText?.trim()) return;
                    await postData(`/messages/${message?.objectId}`, {
                        text: realText?.trim().length ? text : "",
                    });
                    setEdit("");
                } catch (err: any) {
                    toast.error(err.message);
                }
                setSubmitting(false);
            }}
        >
            {({
                values,
                setFieldValue,
                handleSubmit,
                isSubmitting,
                dirty,
                errors,
            }) => (
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="w-full h-full flex flex-col"
                >
                    <div className="w-full h-full border border-gray-500 rounded flex flex-col items-center bg-white">
                        <QuillEditorEdit
                            editorRef={editorRef}
                            text={values.text}
                            setFieldValue={setFieldValue}
                            placeholder="Send a message"
                            handleSubmit={handleSubmit}
                            forceUpdate={forceUpdate}
                        />
                    </div>
                    <EditMessageFooter
                        setEdit={setEdit}
                        editorRef={editorRef}
                        isSubmitting={isSubmitting}
                        dirty={dirty}
                        errors={errors}
                    />
                </form>
            )}
        </Formik>
    );
}
