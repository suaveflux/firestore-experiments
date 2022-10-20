import { db } from "../utils/db";

const resetDoc = async (doc: any) => {
    await db.collection("movies").doc("matrix").set(doc)
    return await getDoc()
}

const getDoc = async ()=>{
    return await db.collection("movies").doc("matrix").get()
}

describe.skip("firebase set", () => {
    let doc: FirebaseFirestore.DocumentSnapshot

    beforeEach(async () => {
        doc = await resetDoc({
            title: "Matrix",
            characters: {
                "Neo": "Kianu Rives",
                "Morpheus": "Laurence Fishburne"
            }
        })

    })

    test("set will override the whole document", async () => {
        let updates = {
            characters: {
                "Trinity": "That Actress"
            }
        }
        await doc.ref.set(updates)

        let newDoc =  (await getDoc()).data()!

        expect(newDoc).toStrictEqual(updates)
    })

    test("set with merge will merge docs and nested maps", async () => {
        let updates = {
            characters: {
                "Trinity": "That Actress"
            }
        }
        await doc.ref.set(updates, {merge:true})

        let newDoc =  (await getDoc()).data()!

        expect(newDoc).toStrictEqual({
            title: "Matrix",
            characters: {
                "Neo": "Kianu Rives",
                "Morpheus": "Laurence Fishburne",
                "Trinity": "That Actress"
            }
        })
    })

    test("update will merge docs but will override nested maps", async () => {
        let updates = {
            characters: {
                "Trinity": "That Actress"
            }
        }

        await doc.ref.update(updates)

        let newDoc =  (await getDoc()).data()!

        expect(newDoc).toStrictEqual({
            title: "Matrix",
            characters: {
                "Trinity": "That Actress"
            }
        })
    })

    test("update will selectively update nested map value with dot notation", async () => {
        let updates = {
            "characters.Neo": "Keanu Reeves"
        }

        await doc.ref.update(updates)

        let newdoc =  (await getDoc()).data()!

        expect(newdoc).toStrictEqual({
            title: "Matrix",
            characters: {
                "Neo": "Keanu Reeves",
                "Morpheus": "Laurence Fishburne"
            }
        })
    })
})
