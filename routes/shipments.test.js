"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

    // Code review: Check what's in resp and test for the error messages,
    //so we can tell it's failing for the reasons we presume it's failing for;

  test("Invalid JSON - missing field", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
    });

    expect(resp.statusCode).toEqual(400);
    // expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("Invalid JSON - invalid input type", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: 123,
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    // expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("Invalid JSON - empty string input", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    // expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("Invalid JSON - additional parameter", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "New York",
      zip: "12345-6789",
      phone: "555555555"
    });

    expect(resp.statusCode).toEqual(400);
    // expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  //Code review: Add an additional property that's not expected;
});
