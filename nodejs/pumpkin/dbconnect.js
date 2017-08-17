

db = new sqlite3.Database('pumpkinpi.db');


// Database initialization
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='nodes'",
       function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "nodes" ' +
           '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
		   '"chipid" int, ' +
           '"address" VARCHAR(255), ' +
           '"name" char, ' +
           '"type" char, ' +
           '"status" int)' , function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("SQL Table 'nodes' initialized.");
      }
    });
  }
  else {
    console.log("SQL Table 'nodes' already initialized.");
  }
});

