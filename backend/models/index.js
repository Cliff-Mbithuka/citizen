require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const db = {};

// ✅ Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, // No need to cast DB_PASS to String
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  }
);

// ✅ Load models dynamically
fs.readdirSync(__dirname)
  .filter((file) => 
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file.slice(-3) === ".js" &&
    !file.includes(".test.js") // Cleaner check for test files
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// ✅ Print registered models BEFORE associations
console.log("Before associations:", Object.keys(db));

// ✅ Register associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    console.log(`Registering associations for ${modelName}`);
    db[modelName].associate(db);
  }
});

// ✅ Print registered models AFTER associations
console.log("After associations:", Object.keys(db));

// ✅ Attach Sequelize instance to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


// require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");

// const basename = path.basename(__filename);
// const db = {};

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   String(process.env.DB_PASS),
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT || "postgres",
//     logging: false,
//   }
// );

// // ✅ Manually require models before loading them dynamically
// const User = require("./user")(sequelize, Sequelize.DataTypes);
// const Incident = require("./incident")(sequelize, Sequelize.DataTypes);

// // ✅ Register models explicitly to prevent undefined issues
// db.User = User;
// db.Incident = Incident;

// // ✅ Load additional models dynamically
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// // ✅ Print registered models BEFORE associations
// console.log("Before associations:", Object.keys(db));

// // ✅ Set up associations after all models are loaded
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     console.log(`Registering associations for ${modelName}`);
//     db[modelName].associate(db);
//   }
// });

// // ✅ Print registered models AFTER associations
// console.log("After associations:", Object.keys(db));

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

