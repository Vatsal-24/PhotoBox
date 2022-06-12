const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

//importing routes
const userRouter = require("./routes/userRoutes");

// initialising app instance
const app = express();

app.use(cors({ credentials: true }));
app.use(express.static(`${__dirname}`));
app.use(express.json());

//DB connection
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log("DB connection successful");
});
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.json({ status: "Up and running" });
});

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => console.log("Server started listening!"));
