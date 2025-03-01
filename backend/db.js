const { Pool } = require("pg");
require(".env").config();

const userDb = new Pool({ connectionString: process.env.USERDB_URL });
const bookingDb = new Pool({ connectionString: process.env.BOOKINGDB_URL });

module.exports = { userDb, bookingDb };
