# Mongoose-Note Part2

# 範例資料

經由前面新增的資料，資料庫內共有 3 筆資料，現在就來針對這 3 筆資料做查詢吧。

![Image](https://i.imgur.com/FbNuDDK.png)

# 查詢資料

因為語法的使用方式非常多樣，並不會全部介紹到，有興趣的可以看 [MongoDB Cheat Sheet](https://gist.github.com/codeSTACKr/53fd03c7f75d40d07797b8e4e47d78ec#chaining/)。

使用 **find** 即可將資料庫內的資料全部查詢出來。

**_sevrer.js_**

```javascript
const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://127.0.0.1:27017/testdb", () => {
  console.log("connected");
});

const findData = async () => {
  try {
    const user = await User.find();
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

findData();
```
