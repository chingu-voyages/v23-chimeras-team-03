const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");
const jwtGenerator = require("../utils/jwtGenerator");

// Register Route
router.post("/register", validInfo, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists, if yes, throw error
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).json("User already exists!");
    }

    // Bcrypt user password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Enter the new user into database
    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    // Generate jwt Token
    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Login route
router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user does not exist

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    // Check if incoming password matches the password in the database
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    // Give them token
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// verify route
router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
