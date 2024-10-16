const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  insecureAuth: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err.message);
    return;
  }
  console.log("Connected to MySQL");
});

const addColumnToUsersInAllDatabases = (columnName, columnType) => {
  connection.query("SHOW DATABASES LIKE 'university_%';", (err, results) => {
    if (err) throw err;

    results.forEach((db) => {
      const dbName = db["Database (university_%)"];
      console.log(`Altering table in database: ${dbName}`);

      const query = `ALTER TABLE ${dbName}.users ADD COLUMN ${columnName} ${columnType};`;
      connection.query(query, (err, result) => {
        if (err) {
          console.error(`Error updating ${dbName}: ${err.message}`);
        } else {
          console.log(`Column ${columnName} added to ${dbName}.user`);
        }
      });
    });
  });
};

addColumnToUsersInAllDatabases("city", "varchar(250)");
