const request = require("supertest");
const userRouter = require("../routes/users-router");
const db = require("../configs/dbConfig");
const server = require("../api/server");

describe("The users-router", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("GET /users", () => {
    it("Should return status 401", async () => {
      return await request(server).get("/users");

      expect(res.status).toBe(401);
    });

    it("Should return the correct object", async () => {
      return await request(server).get("/users");

      expect(res.type).toBe("/application/json");
    });
  });
});
