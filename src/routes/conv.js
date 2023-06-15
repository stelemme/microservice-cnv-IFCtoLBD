const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  IfcToLbdGET,
  IfcToLbdPOST,
} = require("../controllers/ifcToLbd");

// Assigning controllers to the "/conv/ifc-to-lbd" URI
router.get("/ifc-to-lbd", IfcToLbdGET);
router.post("/ifc-to-lbd", IfcToLbdPOST);

module.exports = router;
