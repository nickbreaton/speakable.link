declare const ENVIRONMENT: "dev" | "production"

function fetchResource(event: FetchEvent) {
    const url = new URL(event.request.url)
    url.hostname = "speakable-link.firebaseapp.com"
    url.port = "443"
    url.protocol = "https:"

    const request = new Request(url.toString(), event.request)

    return fetch(request)
}

async function handleRequest(event: FetchEvent) {
    if (event.request.url.includes("hello")) {
        return new Response(null, {
            status: 303,
            headers: {
                Location: "https://www.google.com",
            },
        })
    }

    return await fetchResource(event)
}

function handleError(error: Error) {
    if (ENVIRONMENT === "production") {
        return new Response("Internal Server Error", { status: 500 })
    } else {
        return new Response(error.message)
    }
}

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event).catch((err) => handleError(err)))
})
