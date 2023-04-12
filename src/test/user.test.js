const supertest = require("supertest");

const app = require("../app/app");
const { closeMongoDbConnection } = require("../app/config/mongodb.config");
const { getUserByUserId } = require("../app/service/user.service");
const { validateUserData } = require("../app/utils/req.validator");

afterAll(() => {
    closeMongoDbConnection();
});

describe("creating user", () => {
    it("when user doesn't exists", async () => {
        const { status, body } = await supertest(app)
        .post("/api/user")
        .send({ userId: "U00001", name: "Bharath", address: "Udupi" });

        expect(status).toBe(201);
        expect(body).toEqual({ message: "User created successfully." });
    });

    it("when user already exists", async () => {
        const { status, body } = await supertest(app)
        .post("/api/user")
        .send({ userId: "U00001", name: "Bharath", address: "Udupi" });

        expect(status).toBe(409);
        expect(body).toEqual({ message: "userId Already exists." });
    });

    it("when request body is empty.", async () => {
        const { status, body } = await supertest(app)
        .post("/api/user")
        .send({});

        expect(status).toBe(400);
        expect(body).toEqual({ message: "Invalid request. please check the userId." });
    });

    it("when userId is invalid.", async () => {
        const { status, body } = await supertest(app)
        .post("/api/user")
        .send({ userId: "U00", name: "Bharath", address: "Udupi" });

        expect(status).toBe(400);
        expect(body).toEqual({ message: "Invalid request. please check the userId." });
    });

    it("when name is invalid.", async () => {
        const { status, body } = await supertest(app)
        .post("/api/user")
        .send({ userId: "U00001", name: "  ", address: "Udupi" });

        expect(status).toBe(400);
        expect(body).toEqual({ message: "Invalid request. please check the name." });
    });

    it("when address is invalid.", async () => {
        const { status, body } = await supertest(app)
        .post("/api/user")
        .send({ userId: "U00001", name: "Bharath", address: "" });

        expect(status).toBe(400);
        expect(body).toEqual({ message: "Invalid request. please check the address." });
    });
});

describe("updating user", () => {
    it("when user exists", async () => {
        const { status, body } = await supertest(app)
        .put("/api/user")
        .send({ userId: "U00001", name: "Bharath", address: "Mangalore" });

        expect(status).toBe(200);
        expect(body).toEqual({ message: "User updated successfully." });
    });

    it("when user doesn't exists", async () => {
        const { status, body } = await supertest(app)
        .put("/api/user")
        .send({ userId: "U00201", name: "Bharath", address: "Mangalore" });

        expect(status).toBe(400);
        expect(body).toEqual({ message: "userId doesn't exists." })
    });
});

describe("get users", () => {
    it("get all the users list", async () => {
        const { status, body } = await supertest(app)
        .get("/api/user");
    
        expect(status).toBe(200);
        expect(Array.isArray(body.users)).toBe(true);
    
        body.users.forEach(user => {
            expect((validateUserData(user)));
        });
    });
});

describe("creating user", () => {
    it("by handling both user exists and doesn't exists scenario", async () => {
        const userData = { userId: "U00001", name: "Bharath", address: "Udupi" };

        const { status, body } = await supertest(app)
        .post("/api/user")
        .send(userData);

        if(status === 409 && await getUserByUserId(userData.userId)) {
            expect(body).toEqual({ message: "userId Already exists." });
        } else {
            expect(status).toBe(201);
            expect(body).toEqual({ message: "User created successfully." });
        }
    });
});