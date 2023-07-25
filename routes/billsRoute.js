const express = require("express");
const {
    addBillsController
} = require("../controllers/billsController");

const router = express.Router();

router.post("/add-bills", addBillsController);

module.exports = router;
