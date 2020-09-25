const express = require("express");
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 7000;

const app = express();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

app.use(cors());
app.use(express.json());

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
