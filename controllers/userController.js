const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await userModel.findOne({ userId, password, verified: true });
    if (user) {
      res.status(200).send("Login success");
    } else {
      res.status(400).json({
        message: "Login failed",
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const registerController = async (req, res) => {
  try {
    //creating new Item
    const newUser = new userModel({ ...req.body, verified: true });
    //Waiting to save the itemm
    await newUser.save();
    res.status(201).send("new user added successfully");
  } catch (error) {
    res.status(401).send(error);
    console.log(error);
  }
};

module.exports = { loginController, registerController };
