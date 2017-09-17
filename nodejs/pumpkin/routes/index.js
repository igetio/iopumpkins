var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  db.all("select ScriptID, Scriptname From scriptid", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
	    res.render('index', { title: 'Main', scripts: row });
	}
  });

});

router.get('/nodes', function (req, res) {
    format = req.query.format;
	 db.all("select nodeid, address, name, type, status, lastresponse, volume, delay FROM nodeid natural join nodeinfo", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
	    res.render('nodes', { title: 'Nodes', nodes: row});
	  
	}
  });
});
router.get('/scripts', function (req, res) {
    format = req.query.format;
	 db.all("select i.ScriptID, Scriptname, count (step) as steps From scriptid i left outer join scriptsteps s on i.scriptid=s.scriptid group by i.scriptid;", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
	  
		res.render('scripts', { title: 'Scripts', scripts: row});

	}
  });
});



router.get('/scripts/:id', function (req, res) {
	var nodeId = req.params.id
	 db.all("select *, step+1 as nextstep , step-1 as prevstep From scriptsteps s left outer join nodeinfo n on s.nodeid = n.nodeid where s.scriptid='"+ nodeId +"';", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
	  	 db.all("select scriptname From scriptid where scriptid='"+ nodeId +"';", function(err, scriptrow) {
          if(err !== null) {
            res.status(500).send( "An error has occurred -- " + err);
          }
          else {
	  
      		res.render('steps', { title: 'Script Steps', scriptid: nodeId, scriptrow: scriptrow, scriptsteps: row});

          }
         });


	}
  });
});

router.get('/confirm/:item/:id', function (req, res) {
   var item = req.params.item
   var nodeId = req.params.id
   var action = req.query.action;
	 res.render('confirm', { 'item': item, 'nodeId': nodeId, 'action': action});
  });

  
router.get('/confirm/:id', function (req, res) {
   var nodeId = req.params.id
   var action = req.query.action;
	 res.render('confirm', { 'nodeId': nodeId, item: "", 'action': action});
  });
  
router.get('/req/:id', function (req, res) {
   var nodeId = req.params.id
   var action = req.query.action;

	 res.send("Updated with: " + action );
  });

module.exports = router;
