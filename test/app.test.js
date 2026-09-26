import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import { config } from "dotenv";
config()

describe("Test the auth routes", () => {

    beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongodb Connect")
    await mongoose.connection.collection('users').deleteOne({ email: "testuser@example.com" });
})

    test("It should sign up a new user", async () => {
        const response = await request(app).post("/api/auth/signup")
            .send({
                username: "testuser",
                email: "testuser@example.com",
                password: "testpassword"
            })

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Signup Successful");
    })

    test("It should log in an existing user", async () => {
        const response = await request(app).post("/api/auth/login")
            .send({
                email: "testuser@example.com",
                password: "testpassword"
            })

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login Successful");
    })

    test("It should display a message for invalid login credentials", async () => {
        const response = await request(app).post("/api/auth/login")
            .send({
                email: "testuser@example.com",
                password: "wrongpassword"
            })

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid Credentials");
    })

    afterAll(async () => {
        await mongoose.connection.close();
        console.log("Database connection closed");
    })

})