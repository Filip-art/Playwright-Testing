import {test, describe, expect } from "@playwright/test"

test.describe("API testy pro prispevky", () => {


    test("mel by nacist seznam vsech prispevku", async ({ request }) => {
        const response = await request.get('/posts')
        
        expect(response.status()).toBe(200)
    })


})