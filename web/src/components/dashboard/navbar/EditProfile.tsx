import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Formik } from "formik";
import toast from "react-hot-toast";

import { APP_NAME } from "config";
import { useUser } from "contexts/UserContext";
import { uploadFile } from "gqlite-lib/dist/client/storage";
import { getHref } from "utils/get-file-url";
import { postData } from "utils/api-helpers";
import now from "utils/now";

import CancelButton from "components/CancelButton";
import ModalButton from "components/dashboard/ModalButton";
import TextField from "components/TextField";

export default function EditProfile({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { userdata } = useUser();
    const userPhotoURL = getHref(userdata?.photoURL);

    const [photo, setPhoto] = useState<File | null | undefined>(null);
    const [photoUrl, setPhotoUrl] = useState("");
    const fileRef = useRef<any>(null);

    useEffect(() => {
        if (photo) setPhotoUrl(URL.createObjectURL(photo));
        else setPhotoUrl("");
    }, [photo]);

    useEffect(() => {
        if (open) {
            setPhoto(null);
            setPhotoUrl("");
        }
    }, [open]);

    const handleSavePicture = async () => {
        try {
            const path = await uploadFile(
                "messenger",
                `User/${userdata.objectId}/${now()}_photo`,
                photo!
            );
            return path;
        } catch (err: any) {
            console.error(err);
            return "";
        }
    };

    const handleDeletePicture = async () => {
        try {
            await postData(`/users/${userdata?.objectId}`, {
                photoPath: "",
            });
            setPhoto(null);
            setPhotoUrl("");
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <div></div>
    );

}
