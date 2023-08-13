import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import classNames from "utils/classNames";
import { getHref } from "utils/get-file-url";

interface Workspace {
    objectId: string;
    name: string;
    thumbnailURL?: string;
    photoURL?: string;
}

interface WorkspacesDropdownProps {
    workspaces: Workspace[];
    select: Workspace | string;
    setSelect: (type: string, value: any) => void;
}

const DEFAULT_IMAGE_URL = `${process.env.PUBLIC_URL}/blank_workspace.png`;

const WorkspacesSelectDropdown: React.FC<WorkspacesDropdownProps> = ({
    workspaces,
    select,
    setSelect,
}) => {
    // Define dropdown properties
    const dropdownId = "workspaces";
    const dropdownName = "workspaces";
    const dropdownClass = "mt-3 w-full th-color-for th-bg-bg border th-border-brblack rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm";
    const labelClass = "block text-sm font-bold th-color-for";

    // Render the WorkspacesSelectDropdown component
    return (
        <div className="w-full">
            <label htmlFor={dropdownId} className={labelClass}>
                Join workspace
            </label>
            <select
                id={dropdownId}
                name={dropdownName}
                value={typeof select === "string" ? select : ''}
                onChange={(e) => setSelect("workspace", e.target.value)}
                className={dropdownClass}
            >
                {workspaces.map((workspace) => (
                    <option key={workspace.objectId} value={workspace.objectId}>
                        {workspace.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

const WorkspacesDropdown: React.FC<WorkspacesDropdownProps> = ({
    workspaces,
    select,
    setSelect,
}) => {
    const labelClass = "block text-sm font-bold th-color-for";
    const dropdownButtonClass = "relative w-full th-bg-bg border th-border-brblack rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm";
    const dropdownOptionClass = (active: boolean) => classNames(
        active ? "th-color-bg th-bg-blue" : "th-color-for",
        "cursor-default select-none relative py-2 pl-3 pr-9"
    );

    return (
        <Listbox value={select} onChange={(e) => setSelect("workspace", e)} as="div">
            <Listbox.Label className={labelClass}>
                Join workspace
            </Listbox.Label>
            <div className="mt-2 relative">
                <Listbox.Button className={dropdownButtonClass}>
                    <span className="flex items-center">
                        <img src={DEFAULT_IMAGE_URL} alt="" className="flex-shrink-0 h-6 w-6 rounded-md" />
                        {typeof select === "object" ? select.name : ''}
                    </span>
                    <SelectorIcon className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" />
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute w-full py-1 mt-2 bg-white shadow-lg max-h-60 rounded-md ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {workspaces.map((workspace) => {
                            const photoURL = getHref(workspace?.thumbnailURL || "") || getHref(workspace?.photoURL || "") || DEFAULT_IMAGE_URL;
                            return (
                                <Listbox.Option key={workspace.objectId} className={({ active }) => dropdownOptionClass(active)} value={workspace}>
                                    {({ selected, active }) => (
                                        <div className="flex items-center">
                                            <img src={photoURL} alt="" className="flex-shrink-0 h-6 w-6 rounded-md" />
                                            <span className={selected ? "font-semibold ml-3 block truncate" : "font-normal ml-3 block truncate"}>
                                                {workspace.name}
                                            </span>
                                            {selected && <CheckIcon className="h-5 w-5 absolute inset-y-0 right-0 flex items-center pr-4" aria-hidden="true" />}
                                        </div>
                                    )}
                                </Listbox.Option>
                            );
                        })}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export { WorkspacesSelectDropdown, WorkspacesDropdown };
