const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

mongoose.set("useCreateIndex", true);

//create app express
const app = express();

//conect to mongodb
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/shir", {
    // .connect("mongodb://localhost/shir", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log(`Error: ${err.message}`);
  });

mongoose.Promise = global.Promise;

//parse the data we get to readable
app.use(bodyParser.json());

//init routes
app.use("/api", require("./routes/api"));

//error handeling middleware
app.use(function(err, req, res, next) {
  //   console.log(err);
  res.status(422).send({ error: err.message });
});

//heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); //relative path
  });
}

//listen to request
const port = process.env.PORT || 5000;
app.listen(port, function listen() {
  console.log(`now listening on port ${port} `);
});
