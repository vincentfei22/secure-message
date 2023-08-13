import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "gqlite-lib/dist/client/storage";

import QuillEditor from "components/dashboard/quill/QuillEditor";
import { useUser } from "contexts/UserContext";
import { MESSAGE_MAX_CHARACTERS } from "config";
import { postData } from "utils/api-helpers";
import classNames from "utils/classNames";
import now from "utils/now";
import { useChannelById } from "hooks/useChannels";
import { useDirectMessageById } from "hooks/useDirects";
import { useUserById } from "hooks/useUsers";

function TypingUser({ userId }: { userId: string }) {
    const { value } = useUserById(userId);

    if (!value) return null;

    return (
        <div className="mr-2 th-color-for">
            {value.displayName} <span className="th-color-for">is typing...</span>
        </div>
    );
}

function KeyboardInfos({ hasText }: { hasText: boolean }) {
    return (
        <div
            className={classNames(
                !hasText ? "opacity-0" : "opacity-100",
                "flex font-normal text-xs space-x-3"
            )}
        >
            <div>
                <span className="font-bold">Shift + Return</span> to send
            </div>
            <div>
                <span className="font-bold">Return</span> to add a new line
            </div>
        </div>
    );
}

export default function Editor() {
    const { workspaceId, channelId, dmId } = useParams();
const editorRef = useRef<any>(null);
const editor = editorRef?.current?.getEditor();
const [files, setFiles] = useState<File[]>([]);
const [hasText, setHasText] = useState(false);
const [isTyping, setIsTyping] = useState(false);
const dropzone = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    onDrop: setFiles,
});

const type = dmId ? "directs" : "channels";
const id = dmId || channelId;

useEffect(() => {
    resetTypingIndicators();

    const interval = setInterval(resetTypingIndicators, 30000);

    return () => {
        clearInterval(interval);
        resetTypingIndicators();
    };
}, [channelId, dmId]);

function resetTypingIndicators() {
    postData(`/${type}/${id}/typing_indicator`, { isTyping: false }, {}, false);
    postData(`/${type}/${id}/reset_typing`, {}, {}, false);
}

const { value: channel } = useChannelById(channelId);
const { value: dm } = useDirectMessageById(dmId);
const { user } = useUser();
const otherUserId = dm?.members.find((m: string) => m !== user?.uid);
const { value: userData } = useUserById(otherUserId || user?.uid);

if (channelId && !channel) return null;
if (dmId && !dm) return null;

const typingArray = (channel || dm).typing.filter((typ: any) => typ !== user?.uid);

function validateMessage() {
    const errors: any = {};
    const realText = editor?.getText() as string | null | undefined;

    if (realText && realText.trim().length > MESSAGE_MAX_CHARACTERS)
        errors.text = `Message is too long. Max ${MESSAGE_MAX_CHARACTERS} characters.`;

    return errors;
}

return (
    <div className="w-full px-5 pb-2 flex-shrink-0">
        {/* ... rest of the JSX ... */}
        <div
            className={classNames(
                "text-xs font-semibold mt-2 th-color-for flex items-center justify-between"
            )}
        >
            <TypingUsers typingArray={typingArray} />
            <KeyboardInfos hasText={hasText} />
        </div>
    </div>
);

function TypingUsers({ typingArray }: any) {
    return (
        <div className={classNames(typingArray?.length > 0 ? "opacity-100" : "opacity-0")}>
            {typingArray?.map((typing: string) => (
                <TypingUser userId={typing} key={typing} />
            ))}
        </div>
    );
}

}
