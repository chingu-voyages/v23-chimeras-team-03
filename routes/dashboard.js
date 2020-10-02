const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

// Get all recipes and username
router.get("/", authorize, async (req, res) => {
  try {
    // req.user has the payload
    const user = await pool.query(
      "SELECT u.name, r.id, r.title, r.diets, r.image, r.ingredients FROM users AS u LEFT JOIN recipes AS r ON u.id = r.user_id WHERE u.id = $1",
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
    const { title, diets, image, ingredients } = req.body;
    const newRecipe = await pool.query(
      "INSERT INTO recipes(user_id, title, diets, image, ingredients) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, title, diets, image, ingredients]
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
    const { title, diets, image, ingredients } = req.body;
    const updateRecipe = await pool.query(
      "UPDATE recipes SET title = $1, diets = $2, image = $3, ingredients = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
      [title, diets, image, ingredients, id, req.user.id]
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
      "DELETE FROM recipes WHERE id = $1 AND user_id = $2 RETURNING *",
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
