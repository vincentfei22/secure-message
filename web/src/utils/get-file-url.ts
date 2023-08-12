import { getFileURL } from "gqlite-lib/dist/client/storage";

export function getHref(url: string) {
  return url ? getFileURL(url) : undefined;
}

