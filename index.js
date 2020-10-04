const express = require("express");
const cors = require("cors");

const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use(cors());
app.use(express.json());

// Routes
// Register and Login route
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard route
app.use("/dashboard", require("./routes/dashboard"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
