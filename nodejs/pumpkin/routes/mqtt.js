var express = require('express');
var router = express.Router();

var mqtt = require('mqtt');
var mqttclient  = mqtt.connect('mqtt://ceres');
mqttclient.subscribe('pumpkin/register');
mqttclient.subscribe('pumpkin/nodes');
mqttclient.subscribe('pumpkin/node/#');
//client.publish('presence', 'Hello mqtt');


mqttclient.on('message', function (topic, message) {
  console.log(topic.toString(),message.toString());
  if(topic.toString() ==  "pumpkin/register") {
      console.log( "Registering " + message.toString());
	  var arr = message.toString().split(",");
	  if (arr[0] == "status") {
		 console.log( "we have a status message");
		  
	  }
    }
});

router.get('/call', function(req, res, next) {
  mqttclient.publish('pumpkin/call', 'ALL');
  res.send('Here We Go Again!');
});


module.exports = router;