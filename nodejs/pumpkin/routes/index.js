var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('table', { title: 'Main' });
});

router.get('/nodes', function(req, res, next) {
  res.render('table', { title: 'Nodes' });
});

router.get('/confirm/:id', function (req, res) {
   var nodeId = req.params.id
   var action = req.query.action;
	 res.render('confirm', { 'nodeId': nodeId, 'action': action});
  });
  
router.get('/req/:id', function (req, res) {
   var nodeId = req.params.id
   var action = req.query.action;

	 res.send("Updated with: " + action );
  });

module.exports = router;
