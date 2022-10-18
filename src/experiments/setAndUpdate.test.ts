import { db } from "../repos/db";

const resetDoc = async (doc: any) => {
    await db.collection("movies").doc("matrix").set(doc)
    return await getDoc()
}

const getDoc = async ()=>{
    return await db.collection("movies").doc("matrix").get()
}

describe.skip("firebase set", () => {
    let matrix: FirebaseFirestore.DocumentSnapshot

    beforeEach(async () => {
        matrix = await resetDoc({
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
        await matrix.ref.set(updates)

        let newMatrix =  (await getDoc()).data()!

        expect(newMatrix).toStrictEqual(updates)
    })

    test("set with merge will merge docs and nested maps", async () => {
        let updates = {
            characters: {
                "Trinity": "That Actress"
            }
        }
        await matrix.ref.set(updates, {merge:true})

        let newMatrix =  (await getDoc()).data()!

        expect(newMatrix).toStrictEqual({
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

        await matrix.ref.update(updates)

        let newMatrix =  (await getDoc()).data()!

        expect(newMatrix).toStrictEqual({
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

        await matrix.ref.update(updates)

        let newMatrix =  (await getDoc()).data()!

        expect(newMatrix).toStrictEqual({
            title: "Matrix",
            characters: {
                "Neo": "Keanu Reeves",
                "Morpheus": "Laurence Fishburne"
            }
        })
    })
})
