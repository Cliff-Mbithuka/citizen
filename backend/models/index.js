require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  String(process.env.DB_PASS),
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  }
);

// ✅ Manually require models before loading them dynamically
const User = require("./user")(sequelize, Sequelize.DataTypes);
const Incident = require("./incident")(sequelize, Sequelize.DataTypes);

// ✅ Register models explicitly to prevent undefined issues
db.User = User;
db.Incident = Incident;

// ✅ Load additional models dynamically
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// ✅ Print registered models BEFORE associations
console.log("Before associations:", Object.keys(db));

// ✅ Set up associations after all models are loaded
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    console.log(`Registering associations for ${modelName}`);
    db[modelName].associate(db);
  }
});

// ✅ Print registered models AFTER associations
console.log("After associations:", Object.keys(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


// require("dotenv").config();

// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");


// const basename = path.basename(__filename);
// const db = {};
// console.log("Loaded models:", Object.keys(db)); 
// console.log("Incident model:", db.Incident); 
// console.log("User model:", db.User);

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

// // ✅ Load models dynamically
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

//   console.log("Before associations:", Object.keys(db)); // ✅ Debugging
// // ✅ Set up associations after all models are loaded
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
// console.log("After associations:", Object.keys(db)); // ✅ Debugging
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
// console.log("Loaded models:", Object.keys(db));  // ✅ Debugging
