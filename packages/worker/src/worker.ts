declare const ENVIRONMENT: "dev" | "production"

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event).catch((err) => handleError(err)))
})

// REQUEST HANDLERS

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
    if (ENVIRONMENT === "production") {
        return new Response("Internal Server Error", { status: 500 })
    } else {
        return new Response(error.message)
    }
}

// HELPERS

async function getRedirectResponse(pathname: string): Promise<Response | null> {
    const word = pathname.substr(1) // removes preceding slash

    // TODO: fetch from firebase database
    if (word === "minecraft") {
        return new Response(null, {
            status: 303,
            headers: { Location: "http://minecraft.net" },
        })
    }

    return null
}
