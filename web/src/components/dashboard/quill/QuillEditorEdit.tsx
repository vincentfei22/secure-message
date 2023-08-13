import { Popover } from "@headlessui/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { useTheme } from "contexts/ThemeContext";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
    placeholder: string;
    setFieldValue: any;
    text: string;
    handleSubmit: any;
    editorRef: any;
    forceUpdate: any;
}

// Component for Emoji Dropdown
function EmojiDropdown({ onEmojiClick }: { onEmojiClick: any }) {
    const { themeColors } = useTheme();

return (
    <Popover as="div" className="z-10 relative">
        {({ open }) => (
            <>
                <Popover.Button as="button" className="flex items-center focus:outline-none">
                    <EmojiHappyIcon style={{ color: themeColors?.foreground }} className="h-5 w-5" />
                </Popover.Button>

                {open && (
                    <div>
                        <Popover.Panel static className="origin-top-left absolute bottom-0 right-0">
                            <Picker onClick={onEmojiClick} title="Emojis" showPreview={false} native set="apple" />
                        </Popover.Panel>
                    </div>
                )}
            </>
        )}
    </Popover>
);

}

// Custom Toolbar for Editor
function CustomToolbar({ editorRef }: { editorRef: any }) {
    const onEmojiClick = (emojiObject: any) => {
        const editor = editorRef?.current?.getEditor();
        const range = editor?.getLength() - 1;
        editor?.insertText(range, emojiObject.native);
    };
    
    const toolbarButtons = [
        { className: 'ql-bold' },
        { className: 'ql-italic' },
        { className: 'ql-strike' },
        { className: 'ql-blockquote' },
        { className: 'ql-code' },
        { className: 'ql-list', value: 'ordered' },
        { className: 'ql-list', value: 'bullet' },
        { className: 'ql-code-block' },
        { className: 'ql-link' }
    ];
    
    const ToolbarButton = ({ className, value }: { className: string, value?: string }) => (
        <button className={className} {...(value ? { value } : {})} />
    );
    
    return (
        <div id="toolbar" className="flex items-center justify-between w-full">
            <div className="flex items-center">
                {toolbarButtons.map((btn, index) => (
                    <ToolbarButton key={index} {...btn} />
                ))}
            </div>
            <div className="ml-auto flex items-center space-x-2">
                <EmojiDropdown onEmojiClick={onEmojiClick} />
            </div>
        </div>
    );
    
}

// Main Editor Component
export default function EditorEdit({
    placeholder,
    setFieldValue,
    text,
    handleSubmit,
    editorRef,
    forceUpdate,
}: EditorProps) {
    const modules = useMemo(
        () => ({
            toolbar: {
                container: "#toolbar",
            },
            clipboard: {
                matchVisual: false,
            },
            keyboard: {
                bindings: {
                    tab: false,
                    custom: {
                        key: 13,
                        shiftKey: true,
                        handler: () => {
                            handleSubmit();
                        },
                    },
                },
            },
        }),
        []
    );

    return (
        <div className="flex flex-col w-full">
            <ReactQuill
                onChange={(e) => {
                    setFieldValue("text", e);
                    forceUpdate();
                }}
                value={text}
                placeholder={placeholder}
                modules={modules}
                formats={[
                    "bold",
                    "italic",
                    "strike",
                    "list",
                    "code",
                    "link",
                    "blockquote",
                    "code-block",
                ]}
                theme="snow"
                ref={editorRef}
                className="editor"
            />
            <CustomToolbar editorRef={editorRef} />
        </div>
    );
}
