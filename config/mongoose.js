//require the library
const mongoose = require("mongoose");

//connect to the database
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://shvm:wyp73zSiWkaWXsKp@contactsdb.3dg9o.mongodb.net/contacts?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on("error", function (err) {
  console.log(err.message);
});

//up and running then print the message
db.once("open", function () {
  console.log("Successfully connected to the database");
});
