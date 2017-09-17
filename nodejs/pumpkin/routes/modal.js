var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/scripts/new', function (req, res) {
    res.render('scriptsnew', { title: 'Script', type: "new"});
});

router.get('/scripts/:id', function (req, res) {
  	var script = req.params.id
     db.all("select scriptid, scriptname FROM scriptid where scriptid='" + script + "'", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
		    res.render('scriptsup', { title: 'Script', scripts: row});
	}
  });

});

router.get('/steps/new/:script/:step', function (req, res) {
	var scriptid = req.params.script
    var step = req.params.step
	 db.all("select * From scriptid;", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
	  	 db.all("select nodeid, name From nodeinfo natural join nodeid where type='Prop';", function(err, noderow) {
           if(err !== null) {
             res.status(500).send( "An error has occurred -- " + err);
           }
           else {
	  
		     res.render('stepsnew', { title: 'Steps', scriptid: scriptid, step: step, scripts: row, nodes: noderow});

	       }
         });
	}
  });
});

router.get('/steps/:script/:id', function (req, res) {
	var step = req.params.id
	var script = req.params.script
	 db.all("select * From scriptsteps s left outer join nodeinfo n on s.nodeid = n.nodeid where s.scriptid='"+ script +"' and s.id='"+ step +"';", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
	  	 db.all("select nodeid, name From nodeinfo natural join nodeid where type='Prop';", function(err, noderow) {
           if(err !== null) {
             res.status(500).send( "An error has occurred -- " + err);
           }
           else {
	  
		     res.render('stepsup', { title: 'Update Step', scriptstep: row, nodes: noderow});

	       }
         });
	}
  });
});



router.get('/nodes/:id', function (req, res) {
  format = req.query.format;
  id = req.params.id;
  db.all("select nodeid, name, address, type, status FROM nodeid natural join nodeinfo where nodeid='" + id + "'", function(err, row) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
		if(format === "html") {
		res.render('nodeup',{title: 'Update Node ' + id , nodes: row});
		}
		else {
		
		res.json(row[0]);
		}
	 
	}
  });
});




module.exports = router;
