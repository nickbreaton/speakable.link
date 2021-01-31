import {
    runFirestoreQuery,
    IStructuredQuery,
    toInt32,
    toTimestamp,
} from "./lib/firebase"

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event).catch((err) => handleError(err)))
})

async function handleRequest(event: FetchEvent) {
    const { pathname } = new URL(event.request.url)

    if (pathname === "/") {
        return handleResourceRequest(event)
    }

    const redirectResponse = await getRedirectResponse(pathname)

    if (redirectResponse) {
        return redirectResponse
    }

    return handleResourceRequest(event)
}

function handleResourceRequest(event: FetchEvent) {
    const url = new URL(event.request.url)
    url.hostname = "speakable-link.firebaseapp.com"
    url.port = "443"
    url.protocol = "https:"

    const request = new Request(url.toString(), event.request)

    return fetch(request)
}

function handleError(error: Error) {
    if (process.env.NODE_ENV === "production") {
        return new Response("Internal Server Error", { status: 500 })
    } else {
        return new Response(error.message)
    }
}

function getDateHoursAgo(numberOfHours: number) {
    return new Date(new Date().getTime() - numberOfHours * 3600 * 1000)
}

async function getRedirectResponse(pathname: string): Promise<Response | null> {
    const word = pathname.substr(1) // removes preceding slash

    const results = await runFirestoreQuery({
        from: [{ collectionId: "links" }],
        where: {
            compositeFilter: {
                op: "AND",
                filters: [
                    {
                        fieldFilter: {
                            field: { fieldPath: "expiration" },
                            op: "GREATER_THAN_OR_EQUAL",
                            value: {
                                timestampValue: toTimestamp(
                                    getDateHoursAgo(12)
                                ),
                            },
                        },
                    },
                    {
                        fieldFilter: {
                            field: { fieldPath: "word" },
                            op: "EQUAL",
                            value: { stringValue: word },
                        },
                    },
                ],
            },
        },
        limit: toInt32(1),
    })

    const redirectUrl: string | null =
        results?.[0]?.document?.fields?.redirectUrl?.stringValue

    if (redirectUrl) {
        return new Response(null, {
            status: 303,
            headers: { Location: redirectUrl },
        })
    }

    return null
}
