import { getTokenFromGCPServiceAccount } from "@sagi.io/workers-jwt"
import type {
    firestore,
    google,
} from "@google-cloud/firestore/build/protos/firestore_v1_proto_api"

export type IStructuredQuery = firestore.IBundledQuery["structuredQuery"]

export function toInt32(value: number): google.protobuf.IInt32Value {
    return value as google.protobuf.IInt32Value
}

export async function runFirestoreQuery(structuredQuery: IStructuredQuery) {
    const token = await getFirestoreToken()

    const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/speakable-link/databases/(default)/documents:runQuery`,
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify({
                structuredQuery,
            }),
        }
    )

    return res.json()
}

export async function getFirestoreToken() {
    const serviceAccountJSON =
        FIREBASE_SERVICE_ACCOUNT_PART_1 +
        FIREBASE_SERVICE_ACCOUNT_PART_2 +
        FIREBASE_SERVICE_ACCOUNT_PART_3

    const token = await getTokenFromGCPServiceAccount({
        serviceAccountJSON: JSON.parse(serviceAccountJSON),
        aud: "https://firestore.googleapis.com/google.firestore.v1.Firestore",
    })

    return token
}
