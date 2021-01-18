import firebase from "firebase"
import { writable, Readable, derived, readable, get } from "svelte/store"

const isSearchCrawler = /bot|googlebot|crawler|spider|robot|crawling/i.test(
    navigator.userAgent
)

interface StoreValue {
    isPending: boolean
    user?: firebase.User
    signIn?: () => void
    signOut?: () => void
}

export const auth = readable<StoreValue>({ isPending: true }, (set) => {
    const update = (value: Partial<StoreValue>) => {
        set({ ...get(auth), ...value })
    }

    if (isSearchCrawler) {
        update({ isPending: false })
        return
    }

    firebase.initializeApp({
        authDomain: "speakable-link.firebaseapp.com",
        apiKey: "AIzaSyACqud1a6xpqh_QWklo4Qm1B-0bomhUrEM",
    })

    firebase.auth().onAuthStateChanged(function (user) {
        update({ isPending: false, user: user ?? undefined })
    })

    update({
        signIn() {
            const provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithRedirect(provider)
        },
        signOut() {
            firebase.auth().signOut()
        },
    })
})
