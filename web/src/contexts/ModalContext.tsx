import { createContext, useContext, useState } from "react";

const modalContextDefaults = {
  openCreateWorkspace: false,
  openCreateChannel: false,
  openEditPassword: false,
  openInviteTeammates: false,
  openPreferences: false,
  openCreateMessage: false,
  createMessageSection: "",
  openWorkspaceSettings: false,
  workspaceSettingsSection: "",
};

const modalContextSetters = {
  setOpenCreateWorkspace: null as any,
  setOpenCreateChannel: null as any,
  setOpenEditPassword: null as any,
  setOpenInviteTeammates: null as any,
  setOpenPreferences: null as any,
  setOpenCreateMessage: null as any,
  setCreateMessageSection: null as any,
  setOpenWorkspaceSettings: null as any,
  setWorkspaceSettingsSection: null as any,
};

export const ModalContext = createContext({
  ...modalContextDefaults,
  ...modalContextSetters,
});



export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [openCreateWorkspace, setOpenCreateWorkspace] = useState(false);
  const [openCreateChannel, setOpenCreateChannel] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [openInviteTeammates, setOpenInviteTeammates] = useState(false);
  const [openPreferences, setOpenPreferences] = useState(false);

  const [openCreateMessage, setOpenCreateMessage] = useState(false);
  const [createMessageSection, setCreateMessageSection] = useState<
    "channels" | "members"
  >("channels");

  const [openWorkspaceSettings, setOpenWorkspaceSettings] = useState(false);
  const [workspaceSettingsSection, setWorkspaceSettingsSection] = useState<
    "members" | "settings"
  >("members");

  const modalContextValue = {
    openCreateWorkspace,
    setOpenCreateWorkspace,

    openCreateChannel,
    setOpenCreateChannel,

    openEditPassword,
    setOpenEditPassword,

    openInviteTeammates,
    setOpenInviteTeammates,

    openPreferences,
    setOpenPreferences,

    openCreateMessage,
    setOpenCreateMessage,
    createMessageSection,
    setCreateMessageSection,

    openWorkspaceSettings,
    setOpenWorkspaceSettings,
    workspaceSettingsSection,
    setWorkspaceSettingsSection,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
