import { Listbox, Transition } from "@headlessui/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { reactions } from "lib/reactions";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { postData } from "utils/api-helpers";
import classNames from "utils/classNames";

interface Reaction {
    name: string;
    value: string | null;
    bgColor: string;
    iconColor: string;
    icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

interface ReactionModalProps {
    messageId: string;
    myReaction: string;
}

export function ReactionModal({
    messageId,
    myReaction,
}: ReactionModalProps) {
    // Initial reaction state
    const defaultReaction = reactions[reactions.length - 1];
    const [selected, setSelected] = useState<Reaction>(defaultReaction);

    // Find the user's reaction
    useEffect(() => {
        const userReaction = reactions.find((r) => r.value === myReaction) || defaultReaction;
        setSelected(userReaction);
    }, [myReaction]);

    // Handle reaction change
    const handleOnChange = async (chosenReaction: Reaction) => {
        setSelected(chosenReaction);
        const postDataPayload = {
            reaction: chosenReaction.value,
        };
        try {
            await postData(`/messages/${messageId}/reactions`, postDataPayload);
        } catch (err: any) {
            const errorMessage = err.message;
            toast.error(errorMessage);
        }
    };

    // Render the reaction modal
    return (
        <Listbox value={selected} onChange={handleOnChange}>
            {({ open }) => (
                <>
                    <Listbox.Label className="sr-only">Reaction</Listbox.Label>
                    <div className="relative flex flex-1">
                        <Listbox.Button className="th-bg-bg th-border-selbg th-color-for relative inline-flex items-center px-3 py-1 border text-sm font-medium focus:z-10 focus:outline-none">
                            <span className="sr-only">Reaction</span>
                            <EmojiHappyIcon className="h-4 w-4" />
                        </Listbox.Button>
                        <Transition
                            show={open}
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Listbox.Options className="z-10 mt-2 absolute left-0 w-full py-1 bg-white shadow-lg max-h-56 rounded-md ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                                {reactions.map((reaction) => (
                                    <Listbox.Option
                                        key={reaction.name}
                                        value={reaction}
                                        className={({ active, selected }) =>
                                            classNames(
                                                active ? "text-white" : "text-gray-900",
                                                selected ? "bg-indigo-600" : "text-gray-900",
                                                "cursor-pointer select-none relative px-4 py-2"
                                            )
                                        }
                                    >
                                        {({ selected }) => (
                                            <div className="flex items-center">
                                                <div
                                                    className={classNames(
                                                        reaction.bgColor,
                                                        "w-8 h-8 rounded-full flex items-center justify-center"
                                                    )}
                                                >
                                                    <reaction.icon
                                                        className={classNames(
                                                            reaction.iconColor,
                                                            "flex-shrink-0 h-5 w-5"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <span
                                                    className={classNames(
                                                        selected ? "font-extrabold" : "",
                                                        "ml-3 block font-medium truncate"
                                                    )}
                                                >
                                                    {reaction.name}
                                                </span>
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}
