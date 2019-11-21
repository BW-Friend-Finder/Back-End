const Users = require("../models/users-model");
const db = require("../configs/dbConfig");
const server = require("../api/server");

describe("users-model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("the insert function", () => {
    it("should register a new user", async () => {
      const user = {
        email: "pam_beasley@example.com",
        password: "pass123",
        first_name: "Pam",
        last_name: "Beasley",
        age: 26,
        gender: "female",
        city: "Scranton",
        state: "PA",
        zipcode: 18509
      };
      await Users.insert(user);

      const users = await db("users");
      expect(users.length).toBe(1);
    });

    it("should resolve to the new user", async () => {
      const userInfo = {
        user_id: 1,
        email: "michael_scott@example.com",
        password: "pass123",
        first_name: "Michael",
        last_name: "Scott",
        age: 48,
        gender: "male",
        city: "Scranton",
        state: "PA",
        zipcode: 18509
      };
      const user = await Users.insert(userInfo);

      expect(user).toEqual({
        user_id: 1,
        email: "michael_scott@example.com",
        first_name: "Michael",
        last_name: "Scott",
        age: 48,
        gender: "male",
        city: "Scranton",
        state: "PA",
        zipcode: 18509
      });
    });
  });
});
