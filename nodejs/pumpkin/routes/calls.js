var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/:id/status/', function (req, res) {
    format = req.query.format;
    id = req.params.id
	 db.all(sqlSelAll , function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
	  if(format === "html") {
		res.send("Node " + id + " has a current status of " + row[0].status);
	  }
	  else {
		res.json(row[0]);
	  }
	}
  });
});

/*
router.get('/:id', function (req, res) {
  format = req.query.format;
  id = req.params.id;
  db.all("select nodeid, name, address, type, status FROM nodeid natural join nodeinfo where nodeid='" + id + "'", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
		if(format === "html") {
		res.render('rename',{title: 'Rename Node ' + id , nodes: row});
		}
		else {
		
		res.json(row[0]);
		}
	 
	}
  });
});*/


router.put('/scripts', function(req, res) {
  name = req.query.name;
  sqlRequest = "insert into scriptid (scriptname) values ('" + name + "');"
  console.log(name);
  console.log(sqlRequest);
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
      db.all("select * FROM scriptid WHERE scriptname='" + name + "'", function(err, row) {
      if(err !== null) {
        res.status(500).send( "An error has occurred -- " + err);
       }
      else {

		  res.json(row);
	     
	   }
      });    
    }
  });
});

router.put('/scripts/:id', function(req, res) {
  id = req.params.id;
  name = req.query.name;
  sqlRequest = "update scriptid set scriptname= '"+ name +"' where scriptid='" + id + "'"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
      db.all("select * FROM scriptid WHERE scriptid='" + id + "'", function(err, row) {
      if(err !== null) {
        res.status(500).send( "An error has occurred -- " + err);
       }
      else {

		  res.json(row);
	     
	   }
      });    
    }
  });
});
// add new steps
router.put('/steps/add', function(req, res) {
  scriptid = req.query.scriptid;
  step = req.query.step;
  nodeid = req.query.Node;
  action = req.query.action;
  track = req.query.track;
  sqlRequest = "Insert into scriptsteps ( scriptid, step, nodeid, action, track) values ('" + scriptid + "', '" + step + "', '" + nodeid + "', '" + action + "', '" + track + "')"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
      db.all("select * FROM scriptsteps WHERE scriptid='" + scriptid + "' AND step='" + step + "' AND nodeid='" + nodeid + "'", function(err, row) {
      if(err !== null) {
        res.status(500).send( "An error has occurred -- " + err);
       }
      else {

		  res.json(row);
	     
	   }
      });    
    }
  });
});

// Update Steps
router.put('/steps/:id', function(req, res) {
  id = req.params.id;
  step = req.query.step;
  nodeid = req.query.Node;
  action = req.query.action;
  track = req.query.track;
  sqlRequest = "UPDATE scriptsteps SET step='" + step + "', nodeid='" + nodeid + "', action='" + action + "', track='" + track + "' WHERE id='" + id + "'"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
      db.all("select * FROM scriptsteps WHERE id='" + id + "'", function(err, row) {
      if(err !== null) {
        res.status(500).send( "An error has occurred -- " + err);
       }
      else {

		  res.json(row);
	     
	   }
      });    
    }
  });
});


// We define another route that will handle updates
router.put('/:id', function(req, res) {
  format = req.query.format;
  id = req.params.id;
  name = req.query.name;
  sqlRequest = "UPDATE nodeinfo SET name='" + name + "' WHERE nodeid='" + id + "'"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
      db.all("select * FROM nodeinfo WHERE nodeid='" + id + "'", function(err, row) {
      if(err !== null) {
        res.status(500).send( "An error has occurred -- " + err);
       }
      else {

		  res.json(row);
	     
	   }
      });    
    }
  });
});

// We define another route that will handle deletion
router.delete('/step/:id', function(req, res) {
  var format = req.query.format;
  var id = req.params.id;  
   
  db.run("DELETE FROM scriptsteps WHERE id='" + id + "'",
         function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
       res.json({id: "Step: " + id, status: "deleted"});
    }
  });
});

router.delete('/script/:id', function(req, res) {
  var format = req.query.format;
  var id = req.params.id;  
   
  db.run("DELETE FROM scriptid WHERE scriptid='" + id + "'",
         function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
		  db.run("DELETE FROM scriptsteps WHERE scriptid='" + id + "'",
               function(err) {
            if(err !== null) {
                res.status(500).send( "An error has occurred -- " + err);
            }
            else {
		      if(format === "html") {
		        res.send(id + ' Deleted!');
		      }
		      else {
		        res.json({id: "Script: " + id, status: "deleted"});
		      }     
            }
          });
    }
  });
});

// We define another route that will handle deletion
router.delete('/:id', function(req, res) {
  format = req.query.format;
  id = req.params.id;
  db.run("DELETE FROM nodeid WHERE nodeid='" + id + "'",
         function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
		  db.run("DELETE FROM nodeinfo WHERE nodeid='" + id + "'",
               function(err) {
            if(err !== null) {
                res.status(500).send( "An error has occurred -- " + err);
            }
            else {
		      if(format === "html") {
		        res.send(id + ' Deleted!');
		      }
		      else {
		        res.json({id: id, status: "deleted"});
		      }     
            }
          });
    }
  });
});

module.exports = router;
