const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://127.0.0.1:27017/testdb", () => {
  console.log("connected");
});

const customFunction = async () => {
  try {
    const user = await User.findOne({ name: "Wei" });
    console.log(user.namedEmail);
  } catch (error) {
    console.log(error.message);
  }
};

customFunction();
