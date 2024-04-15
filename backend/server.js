require("dotenv").config();
const express = require("express");
const routes = require("./routes/index-route");
const myErrorHandler = require("./middlewares/global-error-handler");
const cookieParser = require("cookie-parser");
const { json } = require("sequelize");
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin:  "http://localhost:5173" }));

app.use("/api/v1", routes);
app.use("*", (req, res) => {
  res.json({ message: "Invalid Url" });
});

app.use(myErrorHandler);

app.listen(port, () => {
  console.log(`app is listening on port ${port}.`);
});
