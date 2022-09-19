const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,

    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} 並不是偶數`,
    },
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    lowercase: true,
  },
  createAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  hobbies: [String],
  address: addressSchema,
});

//不能用arrow func 因為會用到this
userSchema.methods.sayHi = function () {
  console.log(`Hi My name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

//chain query 只能在query function後面接著用 例如find findOne where
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") }).select("name");
};

//cross application
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

//middleware
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
