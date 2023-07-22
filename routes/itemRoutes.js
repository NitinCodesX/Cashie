const express = require("express");
const {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController
} = require("../controllers/itemController");

const router = express.Router();
//routes

//Method - get
router.get("/get-item", getItemController);

// //Method - POST
router.post("/add-item", addItemController);

// //Meth0d - edit
router.put('/edit-item',editItemController)

router.delete('/delete-item', deleteItemController);

module.exports = router;
