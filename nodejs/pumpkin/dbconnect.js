

db = new sqlite3.Database('pumpkinpi.db');


// Database initialization
db.get("SELECT name FROM sqlite_master WHERE type='table'",
       function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
   console.log("SQL is not initialized. Please Run SQL script");
  }
  else {
    console.log("SQL database already initialized.");
  }
});
