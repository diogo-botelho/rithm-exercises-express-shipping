"use strict";

const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {

    shipItApi.shipProduct.mockReturnValue(1);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

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
});
