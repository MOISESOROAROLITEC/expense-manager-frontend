import { ResponseData } from "./types";

export function catchRequestError(res: any) {
  const response: ResponseData = JSON.parse(res.stdout);
  if (!response.data) {
    throw new Error(response.errors?.[0].message);
  }
}
