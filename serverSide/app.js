require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const bookmarkController = require("./controllers/bookmarkController");
const MONGOURI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

mongoose.connection.on("error", (err) => {
  show(err.message);
});
mongoose.connection.on("disconnected", () => {
  show("Hey You disconnected from Mongo");
});

mongoose.connection.once("open", () => {
  show("Connected to Mongo ");
});

app.use("/bookmarks", bookmarkController);

app.listen(PORT, () => {
  show("Listening on port: ", PORT);
});
