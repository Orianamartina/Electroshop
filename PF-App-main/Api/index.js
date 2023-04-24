const server = require("./src/app.js");
const { addProducts } = require("./src/controlers/products.js");
const { serverAdmin } = require("./src/controlers/Users.js");
const { conn } = require("./src/db.js");

require("dotenv").config();

const PORT = process.env.PORT;
// Syncing all the models at once.


conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    serverAdmin();
    addProducts();
    console.log(`listening to ${PORT}`); // eslint-disable-line no-console
  });
});
