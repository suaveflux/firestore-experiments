import { db } from "../utils/db";

describe.skip("get doc", () => {
    test("get inexistent doc", async () => {
        const scarryMovie = await db.collection("movies").doc("scarryMovie").get()

        expect(scarryMovie.exists).toBeFalsy()

        expect(scarryMovie.data()).toBeUndefined()
    })

    test("queries and gets on inexistent docs and collections", async ()=>{
        const movieDoc = await db.collection("movies").doc("inexistent").get();
        expect(movieDoc).toBeDefined()

        const lisbonCinemaQuery = movieDoc.ref.collection("cinemas").doc("lisbon")
        expect(lisbonCinemaQuery).toBeDefined()

        const lisbonCinema = await lisbonCinemaQuery.get()
        expect(lisbonCinema).toBeDefined()
        expect(lisbonCinema.exists).toBeFalsy()
        expect(lisbonCinema.data()).toBeUndefined()

    })
})