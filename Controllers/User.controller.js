const User = require("../Models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    // extracting user inputs from request body
    const { email, password } = req.body;

    // Create a new user object
    const newUser = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
    };

    // Save the user to db

    const user = await User.create(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(403).json({ error });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Find the user with the provided username
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error });
    }

    // Check if the password matches
    const passwordMatch = bcrypt.compareSync(password, user.password);

    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ error: "please verify credentials" });
    }

    // Create a JWT token
    const exp = Date.now() + 1000 * 60 * 60 * 7;

    const token = jwt.sign(
      { email: req.body.email, exp },
      "kurhqerygq0981ygjqgvfug7821y3jhvqjdhqwj3123259d"
    );

    res.cookie("	Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
    });
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

function logout(req, res) {
  try {
    res.clearCookie("authorization");
    res.status(200).json("logged out");
  } catch (err) {
    console.log(err);
    res.status(400).json("try again");
  }
}

module.exports = {
  signup,
  login,
  logout
};
