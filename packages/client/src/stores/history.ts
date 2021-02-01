import { auth } from "./auth"
import { derived } from "svelte/store"
import firebase from "firebase"

function toDate(value: { seconds: number }) {
    return new Date(value.seconds * 1000)
}

// TODO: fix typing of this funciton, not inferred properly
export const history = derived(auth, ($auth: any, set: any) => {
    if ($auth.user) {
        firebase
            .firestore()
            .collection("links")
            .where("authorUid", "==", $auth.user.uid)
            .onSnapshot((snapshot) => {
                const links = snapshot.docs
                    .map((doc) => {
                        const link: {
                            expiration: { seconds: number }
                            word: string
                            redirectUrl: string
                        } = doc.data() as any
                        const expiration = toDate(link.expiration)
                        return { ...link, expiration }
                    })
                    .sort((a, b) => {
                        return b.expiration.getTime() - a.expiration.getTime()
                    })

                set(links)
            })
    }
    set([])
})
