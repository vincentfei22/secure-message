import { getAPIUrl } from "config";
import { getIdToken } from "gqlite-lib/dist/client/auth";

interface IError {
  error: {
    type: string;
    message: string;
    code?: string;
  };
}

async function handleResponseError(res: Response) {
  if (!res.ok) {
    const e: IError = await res.json();
    const error = new Error(e.error.message);
    throw error;
  }
}

export const fetcher = async (url: string) => {
  const headers: any = {
    "Content-Type": "application/json",
  };
  const idToken = await getIdToken();
  if (idToken) {
    headers.Authorization = `Bearer ${idToken}`;
  }

  const res = await fetch(`${getAPIUrl()}${url}`, {
    method: "get",
    headers,
  });
  await handleResponseError(res);
  return await res.json();
};

export const postData = async (
  url: string,
  data?: {},
  addHeaders?: {},
  warnIfError = true
) => {
  const headers: any = {
    "Content-Type": "application/json",
    ...addHeaders,
  };
  const idToken = await getIdToken();
  if (idToken) {
    headers.Authorization = `Bearer ${idToken}`;
  }

  const res = await fetch(`${getAPIUrl()}${url}`, {
    method: "post",
    headers,
    body: JSON.stringify(data || {}),
  });
  
  if (!res.ok && warnIfError) {
    await handleResponseError(res);
   } else {
     const contentType = res.headers.get("content-type");
     if (contentType && contentType.indexOf("application/json") !== -1)
       return await res.json();
   }
   return;
};

export const deleteData = async (url: string, addHeaders?: {}) => {
  
   const headers: any = {
     "Content-Type": "application/json",
     ...addHeaders,
   };
   
   const idToken = await getIdToken();
   
   if (idToken) {
     headers.Authorization = `Bearer ${idToken}`;
   }

   const res = await fetch(`${getAPIUrl()}${url}`, {
     method: "delete",
     headers,
   });
   
   await handleResponseError(res);
   const contentType = res.headers.get("content-type");
   if (contentType && contentType.indexOf("application/json") !== -1)
     return await res.json();
};


