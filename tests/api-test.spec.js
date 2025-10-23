import { test, expect } from '@playwright/test'

test("měl by načíst data o konkrétním uživateli", async ({ request }) => {
    const url = 'https://jsonplaceholder.typicode.com/users/2'

    const response = await request.get(url);

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    const data = await response.json()

    expect(data.name).toBe("Ervin Howell")
    expect(data.email).toBe("Shanna@melissa.tv")
})

test("měl by úspěšně vytvořit nového uživatele", async ({ request }) => {
    const url = "https://jsonplaceholder.typicode.com/users"

    const response = await request.post(url, {
        data: {
            name: "Clemento Tester",
            username: "clemento",
            email: "clemento@test.biz"
        }
    })

    expect(response.status()).toBe(201);

    const data = await response.json()
    expect(data).toHaveProperty("id")
});
