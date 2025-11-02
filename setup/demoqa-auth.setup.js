import { test as setup, expect } from '@playwright/test'
import fs from 'fs'


setup("Authentication for DemoQA", async ({ request }) => {
    const username = "tester" + Date.now()
    console.log(typeof(username))
    const password = "Testerin123!"

    const endpointRegister = 'https://demoqa.com/Account/v1/User'

    const payload = {
        userName: username, 
        password: password
    }

    const response = await request.post(endpointRegister, { data: payload })

    expect(response.status()).toBe(201)

    const data = await response.json()

    console.log(data)

    const endpointGenerateToken = 'https://demoqa.com/Account/v1/GenerateToken'

    const responseToken = await request.post(endpointGenerateToken, { data: payload })

    expect(responseToken.status()).toBe(200)

    const dataToken = await responseToken.json()

    const token = dataToken.token
    console.log(token)


    const userID = data.userID

    const storageState = {
        cookies: [
            {
                name: "token",
                value: dataToken.token,
                domain: "demoqa.com",
                path: "/"
            },
            {
                name: "userID",
                value: userID,
                domain: "demoqa.com",
                path: "/"
            },
            {
                name: "userName",
                value: username,
                domain: "demoqa.com",
                path: "/"
            },
            {
                name: "expires",
                value: dataToken.expires,
                domain: "demoqa.com",
                path: "/"
            },                                    
        ],
        origins: []
    }

    // const storageState = {
    //     cookies: [],
    //     origins: [
    //         {
    //             origin: 'https://demoqa.com',
    //             localStorage: [
    //                 { name: 'token', value: token},
    //                 { name: 'userID', value: userID},
    //                 { name: 'userName', value: username},
    //                 { name: 'expires', value: dataToken.expires},

    //             ]
    //         }
    //     ]
    // }

    const authFile = 'playwright/.auth/demoqa-user.json'

    fs.writeFileSync(authFile, JSON.stringify(storageState))

    console.log("vytvořen soubor " + authFile)

})