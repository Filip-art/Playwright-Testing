import {test, describe, expect } from "@playwright/test"

test.describe("API testy pro prispevky", () => {

    test("mel by nacist seznam vsech prispevku", async ({ request }) => {
        const response = await request.get('/posts')
        
        expect(response.status()).toBe(200)

        const data = await response.json()

        expect(Array.isArray(data)).toBeTruthy()
        expect(data.length).toBeGreaterThan(0)
    })

    test("měl by úspěšně vytvořit nový příspěvek", async({ request }) => {
        // const response = await request.post("/posts")

        const payload = {
            title: "můj nový příspěvek",
            body: "Toto je obsah příspěvku",
            userId: 1
        }

        const response = await request.post("/posts", { data: payload })
        
        expect(response.status()).toBe(201)

        const data = await response.json()

        expect(data.title).toBe(payload.title)
        expect(data).toHaveProperty("id")
    })

})