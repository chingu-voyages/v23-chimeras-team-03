const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

// Get all recipes and username
router.get("/", authorize, async (req, res) => {
  try {
    // req.user has the payload
    const user = await pool.query(
      "SELECT u.user_name, r.recipe_id, r.label, r.dietlabels, r.source, r.image, r.url, r.text FROM users AS u LEFT JOIN recipes AS r ON u.user_id = r.user_id WHERE u.user_id = $1",
      [req.user.id]
    );
    res.json(user.rows);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Create a recipe
router.post("/recipes", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { label, dietlabels, source, image, url, text } = req.body;
    const newRecipe = await pool.query(
      "INSERT INTO recipes(user_id, label, dietlabels, source, image, url, text) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [req.user.id, label, dietlabels, source, image, url, text]
    );

    res.json(newRecipe.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a recipe
router.put("/recipes/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { label, dietlabels, source, image, url, text } = req.body;
    const updateRecipe = await pool.query(
      "UPDATE recipes SET label = $1, dietlabels = $2, source = $3, image = $4, url = $5, text = $6 WHERE recipe_id = $7 AND user_id = $8 RETURNING *",
      [label, dietlabels, source, image, url, text, id, req.user.id]
    );
    if (updateRecipe.rows.length === 0) {
      return res.json("This recipe is not yours!");
    }
    res.json("Recipe was updated");
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a recipe
router.delete("/recipes/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteRecipe = await pool.query(
      "DELETE FROM recipes WHERE recipe_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteRecipe.rows.length === 0) {
      return res.json("This recipe is not yours");
    }

    res.json("Recipe was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
