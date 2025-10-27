import { test, describe, expect } from "@playwright/test"

describe("přidani komentářů přes API", () => {

    const id = 1
    const endpoint = `/comments?postId=${id}`
    const endpointObecny = "/comments"

    test("načtení všech komentářů pro dané ID", async({ request}) => {
        const response = await request.get(endpoint)

        expect(response.status()).toBe(200)

        const data = await response.json() // bez await je to jen promise, u kterýho musím mít štěstí aby doběhl, ale jinak s await se počká na doběhnutí a dostanu array !!

        expect(Array.isArray(data)).toBeTruthy()

        for(let comment of data) {
            expect(comment.postId).toBe(1)
        }
    })

    test("vytvoření komentáře pro dané ID", async({ request }) => {
        
        for (let i = 0; i < 20; i++) {
            const payload = {
                postId: i,
                name: `Koment test - ${i}`,
                email: `User${i}@example.com`,
                body: `Tohle je testovací komentář číslo ${i}`
            }

            const response = await request.post(endpointObecny, { data: payload})

            expect(response.status()).toBe(201)

            const data = await response.json()

            expect(data.postId).toBe(i)

        }
        

    })

})