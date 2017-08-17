var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function (req, res) {
    format = req.query.format;
	 db.all("select * FROM nodes", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
	  if(format === "html") {
		res.render('nodes-table', { title: 'Nodes', nodes: row});
	  }
	  else {
		res.json({ "data": row });
	  }
	}
  });
});

// We define a new route that will handle node creation
router.post('/', function(req, res) {
  format = req.query.format;
  address = req.query.address;
  chipid = req.query.chipid;
  type = req.query.type;
  sqlRequest = "INSERT INTO 'nodes' (chipid, address, name, type, status) " +
               "VALUES('" + chipid + "', '" + address + "', '" + chipid + "', '" + type + "', '0')"
  if (!chipid || !address || !type) {
    res.send("Parameters missing please try again"); 
    
  }
  else {
db.run(sqlRequest, function(err) {
      if(err !== null) {
        res.status(500).send( "An error has occurred -- " + err);
      }
      else {
        db.all("select chipid FROM nodes WHERE address='" + address + "' and chipid='" + chipid + "'", function(err, row) {
          if(err !== null) {
            res.status(500).send( "An error has occurred -- " + err);
          }
          else {
                if(format === "html") {
                  res.send(row);
                }
                else {
                  res.json(row[0]);
                }
          
          }
     
        });
      }
    });
	   
  }
});
router.get('/:where(type|status)/:value', function (req, res) {
    format = req.query.format;
	where = req.params.where;
	value = req.params.value;
	 db.all("select * FROM nodes WHERE " + where + "='" + value + "'", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
	  if(format === "html") {
		res.render('nodes-table', { title: 'Nodes', nodes: row});
	  }
	  else {
		res.json(row);
	  }
	}
  });
});

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

router.put('/:id/status/:state(1|0)', function (req, res) {
    format = req.query.format;
    state = req.params.state;
    id = req.params.id;
	 db.all("UPDATE nodes SET status = '" + state + "'  WHERE id='" + id + "'", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
	else {
      db.all("select * FROM nodes WHERE id='" + id + "'", function(err, row) {
      if(err !== null) {
        res.status(500).send( "An error has occurred -- " + err);
       }
      else {
		     request("http://" + row[0].address + "/gpio/" + state, function (error, response, body) {
                 if (!error && response.statusCode == 200) {
                 console.log(body); // Show the HTML for the Modulus homepage.
                 }
             })
		  
	    if(format === "html") {
		  res.send("Node " + nodeid + " set to status of " + status);
		 }
	    else {
		  res.json(row);
	     }
	   }
      });
	}
  });
});
router.get('/:id', function (req, res) {
  format = req.query.format;
  id = req.params.id;
  db.all("select * FROM nodes WHERE id='" + id + "'", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
		if(format === "html") {
		res.render('update',{title: 'Update Node ' + id , nodes: row});
		}
		else {
		
		res.json(row[0]);
		}
	 
	}
  });
});
// We define another route that will handle updates
router.put('/:id', function(req, res) {
  format = req.query.format;
  id = req.params.id;
  address = req.query.address;
  name = req.query.name;
  type = req.query.type;
  sqlRequest = "UPDATE nodes SET address='" + address + "', name='" + name + "', type='" + type + "' WHERE id=" + id 
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
      db.all("select * FROM nodes WHERE id='" + id + "'", function(err, row) {
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

router.put('/:id/:setParam(address|type)/:value', function(req, res) {
  format = req.query.format;
  id = req.params.id;
  setParam = req.params.setParam;
  value = req.params.value;
  sqlRequest = "UPDATE nodes SET " + setParam + "='" + value + "' WHERE id=" + id 
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
		if(format === "html") {
         res.render('update-sub', {'title': 'Updated Node ' + nodeid, 'chipid': nodeid, 'setParam': setParam, 'value': value});
		}
		else {
		res.json({id: id, status: "updated"});
		}
      
    }
  });
});

// We define another route that will handle deletion
router.delete('/:id', function(req, res) {
  format = req.query.format;
  id = req.params.id;
  db.run("DELETE FROM nodes WHERE id='" + id + "'",
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
});

module.exports = router;
