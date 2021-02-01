import { auth } from "../stores/auth"
import { get } from "svelte/store"

function getBaseUrl() {
    return (import.meta as any).env.NODE_ENV === "production"
        ? "https://us-central1-speakable-link.cloudfunctions.net/"
        : "http://localhost:5001/speakable-link/us-central1/"
}

export async function request<ResponseData = void>(
    handler: string,
    body?: any,
    requestInit?: RequestInit
): Promise<ResponseData> {
    const init: RequestInit = {
        method: "POST",
        ...requestInit,
        headers: {
            ...requestInit?.headers,
            "X-ID-TOKEN": (await get(auth).user?.getIdToken()) ?? "",
        },
    }

    if (body !== undefined) {
        init.body = JSON.stringify(body)
    }

    return fetch(getBaseUrl() + handler, init).then((res) => res.json())
}

export function shortenLink(link: string) {
    return request("shortenLink", { link })
}

export function deleteLink(id: string) {
    return request("deleteLink", { id })
}
