const mongoose = require("mongoose");
const User = require("./User2");

//定義Schema
//在Schema的欄位上加上required 和 type 要是沒有遵循的話就會報錯 報錯用trycatch把error message印出來
//設定lowercase 可以讓資料進到資料庫的時候都變成小寫
//加上immutable的欄位沒有辦法再去更動 即使沒有報錯 值也不會寫進資料庫
//設定min = 最小能接受的值 max = 最大能接受的值 minLength 最小能接受的字串長度
//validate 可以自行撰寫判斷規則 並回傳客製化的訊息
//findByIdAnd... updateMany updateOne建議不要使用 因為是這些方法是直接使用mongoDB去做存取寫入 並不會偵測到我們自己設計的schema validate
mongoose.connect("mongodb://127.0.0.1:27017/testdb", () => {
  console.log("connected");
});

/**
 * * 建立新資料的方法
 */

// const createNewData = async () => {
//   //兩種都一樣
//   //   const user = await User.create({ name: "Wei", age: 24 });
//   //   user.name = "Yun";
//   //   await user.save();
//   //-----------------------------------------------------------------
//   //   const user = new User({ name: "Wei", age: 24 });
//   //   await user.save();
//   //-----------------------------------------------------------------

//   try {
//     const user = await User.create({
//       name: "WeiYunYun",
//       age: 26,
//       email: "EQAW@GMAIL.COM",
//       hobbies: ["Baseketball"],
//       address: {
//         street: "Minze",
//       },
//     });
//     console.log(user);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

/**
 * * 查詢資料的方法
 */

// const findData = async () => {
//   try {
//     // const user = await User.find({ name: "Wei" }); //exists findOne
//     // const user = await User.where("name").equals("Wei").limit(1).select("name"); //select where 跟 mysql一樣
//     // console.log(user);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// findData();

/**
 * * 更新資料的方法不建議使用 因為不會通過validate 要使用的話強烈建議把runValidators設置為true
 */

//不會通過validate 會直接把資料寫進資料庫
const updateData = async () => {
  try {
    let opts = { runValidators: true };
    const a = await User.updateOne(
      { age: { $gte: 30 } },
      { age: 23, name: "qq" },
      opts
    );
    console.log(a);
  } catch (error) {
    console.log(error.message);
  }
};
updateData();
// run();

/**
 * * 類Join Populate
 */

// const joinData = async () => {
//   try {
//     const user = await User.where("age")
//       .gt("12")
//       .where("name")
//       .equals("Wei")
//       .populate("bestFriend")
//       .limit(1);

//     console.log(user);
//     // user[0].bestFriend = "632562313783a106122ea42b";
//     // user[0].save();
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// joinData();

/**
 * * custom function
 */

// const customFunction = async () => {
//   try {
//     // const user = await User.findByName({ name: "Wei" }); //statics
//     // const user = await User.find().byName("Wei"); //query
//     // console.log(user);
//     // console.log(user.namedEmail); virtual
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// customFunction();
