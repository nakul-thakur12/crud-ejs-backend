const { render } = require("ejs");
const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./model/user");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

// API for Reading user data
app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});
// API for Creating user
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  await userModel.create({
    name,
    email,
    image,
  });
  res.redirect("/read");
});

// API for deleting user
app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

// API for Updating user
app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});
app.post("/update/:id", async (req, res) => {
  let { name, email, image } = req.body;

  await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, image },
    { new: true }
  );
  res.redirect("/read");
});

app.listen(3000, (req, res) => {
  console.log("yes it is working now");
});
