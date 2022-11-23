const { Pool } = require("pg");
const Promise = require("bluebird");

// use .env for this data
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});


// bluebird ----------------------------
const db = Promise.promisifyAll(pool, { multiArgs: true });

// if .connectASYNC no need for schema.sql file ---
db.connectAsync()
  .then(() => console.log(`Connected to Postgres: ${process.env.PGDATABASE}`))
  .then(() =>
    // Expand this table definition as needed: LOGIN ---
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS login (id serial NOT NULL PRIMARY KEY, username VARCHAR(500) NOT NULL, password VARCHAR(500) NOT NULL, balance INT)"
    )
  )
  .then(() =>
    // Expand this table definition as needed: TRANSACTIONS ---
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS transactions (id serial NOT NULL PRIMARY KEY, userid INT REFERENCES login(id), amount VARCHAR(500) NOT NULL, title VARCHAR(500) NOT NULL, date VARCHAR(500) NOT NULL, time VARCHAR(500) NOT NULL, tag VARCHAR(500) NOT NULL, sign VARCHAR(500) NOT NULL)"
    )
  )
  .then(() =>
    // Expand this table definition as needed: GOALS ---
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS goals (id serial NOT NULL PRIMARY KEY, userid INT REFERENCES login(id), save VARCHAR(500) NOT NULL, sdate VARCHAR(500) NOT NULL, date VARCHAR(500) NOT NULL)"
    )
  )
  .catch((err) => console.log(err));


module.exports = db;
