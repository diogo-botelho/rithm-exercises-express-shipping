"use strict";

const express = require("express");
const jsonschema = require("jsonschema");

const { shipProduct } = require("../shipItApi");
const shipSchema = require("../schemas/shipSchema.json");
const { BadRequestError } = require("../expressError");

const router = new express.Router();

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const { productId, name, addr, zip } = req.body;
  // console.log(req.body);

  // const result = jsonschema.validate({
  //   productId,
  //   name,
  //   addr,
  //   zip
  // }, shipSchema);
  
  const result = jsonschema.validate(req.body, shipSchema);

  if (!result.valid) {
    let errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});

module.exports = router;