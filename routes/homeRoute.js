const express = require("express");
const {
    getHomeController
} = require("../controllers/HomeController")

const router = express.Router();
//routes

//Method - get
router.get("/get-parameters", getHomeController);


module.exports = router;
