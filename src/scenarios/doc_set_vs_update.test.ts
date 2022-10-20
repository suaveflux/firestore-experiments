import { db } from "../utils/db";

const resetDoc = async (doc: any) => {
    await db.collection("movies").doc("matrix").set(doc)
    return await getDoc()
}

const getDoc = async () => {
    return await db.collection("movies").doc("matrix").get()
}

describe("firebase set", () => {
    const orig = {
        title: "Matrix",
        characters: {
            "Neo": "Kianu Rives",
            "Morpheus": "Laurence Fishburne"
        },
        rewards: {
            "oscars": 2,
            "golden globes": 1
        },
        tags: ["scifi", "suspense"]
    }

    let doc: FirebaseFirestore.DocumentSnapshot

    beforeEach(async () => {
        doc = await resetDoc(orig)
    })

    test("set", async () => {
        let update = {
            characters: {
                "Trinity": "That Actress"
            }
        }
        await doc.ref.set(update)

        let newDoc = (await getDoc()).data()!

        expect(newDoc).toStrictEqual(update)
    })

    test("set with merge", async () => {
        let update = {
            characters: {
                "Trinity": "That Actress"
            },
            rewards: {},
            tags: ["classic"]
        }
        await doc.ref.set(update, { merge: true })

        let newDoc = (await getDoc()).data()!

        expect(newDoc).toStrictEqual({
            ...orig,
            characters: {
                "Neo": "Kianu Rives",
                "Morpheus": "Laurence Fishburne",
                "Trinity": "That Actress"
            },
            rewards: update.rewards,
            tags: update.tags
        })
    })

    test("set with mergeFields with field content given", async () => {
        let update = {
            title: "Matrix 2",
            characters: {
                "Trinity": "That Actress"
            },
            rewards: {},
            tags: ["classic"]
        }
        await doc.ref.set(update, { mergeFields: ["characters", "tags"] })

        let newDoc = (await getDoc()).data()!

        expect(newDoc).toStrictEqual({
            ...orig,
            characters: update.characters,
            tags: update.tags
        })
    })

    test("set with mergeFields with field content empty", async () => {
        let update = {
            title: "Matrix 2",
            characters: {},
            rewards: {},
            tags: []
        }
        await doc.ref.set(update, { mergeFields: ["characters", "tags"] })

        let newDoc = (await getDoc()).data()!

        expect(newDoc).toStrictEqual({
            ...orig,
            characters: update.characters,
            tags: update.tags
        })
    })

    test("update with content", async () => {
        let update = {
            characters: {
                "Trinity": "That Actress"
            },
            tags: ["classic"]
        }

        await doc.ref.update(update)

        let newDoc = (await getDoc()).data()!

        expect(newDoc).toStrictEqual({
            ...orig,
            characters: update.characters,
            tags: update.tags
        })
    })

    test("update with no content", async () => {
        let update = {
            characters: {},
            tags: []
        }

        await doc.ref.update(update)

        let newDoc = (await getDoc()).data()!

        expect(newDoc).toStrictEqual({
            ...orig,
            characters: update.characters,
            tags: update.tags
        })
    })

    test("update with nested map and dot notation", async () => {
        let update = {
            "characters.Neo": "Keanu Reeves"
        }

        await doc.ref.update(update)

        let newdoc = (await getDoc()).data()!

        expect(newdoc).toStrictEqual({
            ...orig,
            characters: {
                ...orig.characters,
                "Neo": "Keanu Reeves",
            }
        })
    })
})
