const request = require("supertest");
const userRouter = require("../routes/hobbies-router.js");
const db = require("../configs/dbConfig");
const server = require("../api/server");

describe("Hobbies router", () => {
  beforeEach(async () => {
    await db("hobbies").truncate();
  });

  describe("GET /all", () => {
    it("should return status 200", async () => {
      return await request(server).get("/all");

      expect(res.status).toBe(200);
    });

    it("should return json object", async () => {
      return await request(server).get("/all");

      expect(res.type).toMatch(/json/i);
    });
  });

  describe("GET /user", () => {
      it("should return 401 without token", async () => {
        return await request(server).get("/user");
        expect(res.type).toBe(401);
      });
  });
});