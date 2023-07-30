import { getFileURL } from "server/dist/client/storage";

export function getHref(url: string) {
  if (!url) return undefined;
  else return getFileURL(url);
}
