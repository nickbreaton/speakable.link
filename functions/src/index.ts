import * as functions from "firebase-functions"
import * as firebase from "firebase-admin"
import { words } from "./tmp-words"

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
firebase.initializeApp()

function withUser(
    callback: (
        uid: string,
        req: functions.https.Request,
        res: functions.Response
    ) => void
) {
    return async (req: functions.https.Request, res: functions.Response) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
        res.setHeader("Access-Control-Allow-Methods", "*")
        res.setHeader("Access-Control-Allow-Headers", "*")

        if (req.method === "OPTIONS") {
            res.sendStatus(200)
            return
        }

        const idToken = req.get("X-ID-TOKEN")

        if (!idToken) {
            res.sendStatus(401)
            return
        }

        try {
            var { uid } = await firebase.auth().verifyIdToken(idToken)
        } catch {
            res.sendStatus(401)
            return
        }

        await callback(uid, req, res)
    }
}

export const shortenLink = functions.https.onRequest(
    withUser((uid, req, res) => {
        const requestData = JSON.parse(req.body)
        console.log({ requestData })
        firebase.firestore().runTransaction(async () => {
            const activeWordsForUser = await firebase
                .firestore()
                .collection("links")
                .where("authorUid", "==", uid)
                .where("expiration", ">=", getDateHoursAgo(12))
                .get()

            if (activeWordsForUser.docs.length > 0) {
                res.sendStatus(409)
                return
            }

            for (let i = 0; i < words.length; i++) {
                const word = getRandomWord()
                const snapshot = await firebase
                    .firestore()
                    .collection("links")
                    .where("word", "==", word)
                    .where("expiration", ">=", getDateHoursAgo(12))
                    .get()

                if (snapshot.docs.length > 0) {
                    // word exists, go again
                    continue
                }

                await firebase
                    .firestore()
                    .collection("links")
                    .add({
                        word,
                        expiration: getDateHoursFromNow(12),
                        redirectUrl: requestData.link,
                        authorUid: uid,
                    })

                res.sendStatus(200)
                return
            }

            res.sendStatus(409) // out of words
        })
        // .collection("links")
    })
)

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function getDateHoursAgo(numberOfHours: number) {
    return new Date(new Date().getTime() - numberOfHours * 3600 * 1000)
}

function getDateHoursFromNow(numberOfHours: number) {
    return getDateHoursAgo(-numberOfHours)
}
