import { HashtagIcon, PlusCircleIcon, SearchIcon } from "@heroicons/react/outline";
import ModalButton from "components/dashboard/ModalButton";
import Spinner from "components/Spinner";
import { ChannelsContext } from "contexts/ChannelsContext";
import { useModal } from "contexts/ModalContext";
import { useUser } from "contexts/UserContext";
import { useWorkspaceById } from "hooks/useWorkspaces";
import { useCallback, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { postData } from "utils/api-helpers";

function ChannelItem({ channel }: { channel: any }) {
    const { user } = useUser();
    const { workspaceId } = useParams();
    const { value: workspace } = useWorkspaceById(workspaceId);
    const navigate = useNavigate();
    const { setOpenCreateMessage } = useModal();
    const [loading, setLoading] = useState(false);

    const handlePostData = useCallback(async (url: string, data?: any) => {
        setLoading(true);
        try {
            await postData(url, data);
            navigate(`/dashboard/workspaces/${workspaceId}/channels/${channel?.objectId}`);
            setOpenCreateMessage(false);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, [workspaceId, channel, navigate, setOpenCreateMessage]);

    return (
        <li className="px-8 py-2 flex justify-between items-center cursor-pointer group">
            <div className="flex items-center group-hover:w-4/6 w-full">
                <div className="rounded p-2 mr-4" style={{ backgroundColor: "#f4ede4" }}>
                    <HashtagIcon className="h-6 w-6" style={{ color: "#4a154b" }} />
                </div>
                <span className="font-bold th-color-for truncate">
                    {channel?.name.replace("#", "")}
                    {channel?.isArchived && <span className="text-sm opacity-70"> (archived)</span>}
                    {workspace?.channelId === channel?.objectId && <span className="text-sm opacity-70"> (default)</span>}
                </span>
            </div>
            {channel?.members?.includes(user?.uid) ? (
                <ModalButton
                    isSubmitting={loading}
                    text={channel?.isArchived ? "Unarchive" : "New message"}
                    onClick={() => handlePostData(channel?.isArchived ? `/channels/${channel?.objectId}/unarchive` : `/channels/${channel?.objectId}/members`)}
                    className="w-full hidden group-hover:inline-flex sm:ml-3 justify-center items-center py-2 px-4 border border-transparent text-base font-bold rounded focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-auto sm:text-sm disabled:opacity-50 opacity-0 group-hover:opacity-100"
                />
            ) : (
                !channel?.isArchived && (
                    <ModalButton
                        isSubmitting={loading}
                        onClick={() => handlePostData(`/channels/${channel?.objectId}/members`, { email: user?.email })}
                        text="Join"
                        className="w-full hidden group-hover:inline-flex sm:ml-3 justify-center items-center py-2 px-4 border border-transparent text-base font-bold rounded focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-auto sm:text-sm disabled:opacity-50 opacity-0 group-hover:opacity-100"
                    />
                )
            )}
        </li>
    );
}

export default function ChannelsSection() {
    const { setOpenCreateChannel, setOpenCreateMessage } = useModal();
    const { value, loading } = useContext(ChannelsContext);
    const [search, setSearch] = useState("");

    const displayChannels = useMemo(() => (
        value?.filter((channel: any) => channel.name.replace("#", "").toLowerCase().includes(search.toLowerCase()))
    ), [value, search]);

    return (
        <>
            <div className="px-8 w-full">
                <div className="flex items-center border w-full shadow-sm rounded px-2 th-color-for th-bg-bg th-border-selbg">
                    <SearchIcon className="h-5 w-5 th-color-for" />
                    <input
                        type="text"
                        name="findMembers"
                        id="findMembers"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Find channels"
                        className="block text-base border-0 w-full focus:outline-none focus:ring-0 th-bg-bg"
                    />
                </div>
            </div>
            {loading && !value ? (
                <div className="flex items-center justify-center px-5">
                    <Spinner className="h-6 w-6 th-color-for" />
                </div>
            ) : (
                <ul className="w-full mt-6 overflow-y-scroll" style={{ height: "460px" }}>
                    <li className="px-8 py-2 flex items-center cursor-pointer" onClick={() => {
                        setOpenCreateMessage(false);
                        setOpenCreateChannel(true);
                    }}>
                        <div className="rounded p-2 mr-4">
                            <PlusCircleIcon className="h-6 w-6 th-color-for" />
                        </div>
                        <span className="font-bold th-color-for">Create channel</span>
                    </li>
                    {displayChannels?.map((channel: any) => <ChannelItem channel={channel} key={channel?.objectId} />)}
                </ul>
            )}
        </>
    );
}
