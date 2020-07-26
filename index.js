const express = require("express");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/", function (req, res) {
  Contact.find({}, function (err, data) {
    if (err) {
      console.log("error in fetching contacts from db");
      return;
    }
    return res.render("index", { contact_list: data });
  });
  //   res.render("index");
});

app.post("/create", function (req, res) {
  Contact.create({ name: req.body.name, phone: req.body.phone }, function (
    err,
    data
  ) {
    if (err) {
      console.log("Error in creating a contact!");
      return;
    }
    return res.redirect("/");
  });
});
app.get("/delete", function (req, res) {
  Contact.findByIdAndDelete(req.query.id, function (err) {
    if (err) {
      console.log("error in deleting", err);
      return;
    }
    return res.redirect("/");
  });
});

// if(process.env.NODE_ENV==='production'){

// }
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Yup!My Server is running on Port", port);
});
