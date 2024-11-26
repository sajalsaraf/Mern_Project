const mongoose = require("mongoose");
const data = require("./data");
const Item = require("./models/Employee");

mongoose.connect("mongodb://localhost:27017/EmployeeMgmtSys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDB = async () => {
  await Item.deleteMany({});
  await Item.insertMany(data);
  console.log("Database seeded!");
  mongoose.disconnect();
};

seedDB().catch((err) => console.error(err));
