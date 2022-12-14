require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//mongodb
require("./data/dbCnnection");

// body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cookieParser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// cors
const cors = require("cors");
app.use(cors());

// path
const authroutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");

// routing
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
  });
});

app.use("/api/auth", authroutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);

// listening

app.listen(port, () => {
  console.log("App is started");
});
