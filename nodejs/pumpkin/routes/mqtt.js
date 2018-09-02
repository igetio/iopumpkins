var express = require('express');
var router = express.Router();

var mqtt = require('mqtt');
var mqttclient  = mqtt.connect('mqtt://localhost');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
	
mqttclient.on('connect', () => {
    mqttclient.subscribe('pumpkin/register')
    mqttclient.subscribe('pumpkin/nodes')
	mqttclient.subscribe('pumpkin/response')
	mqttclient.subscribe('pumpkin/sensor')	
})

mqttclient.on('message', function (topic, message) {
  console.log(topic.toString(),message.toString());
  switch (topic) {
	  case 'pumpkin/register':
	    return handleRegisterReq(message)
	  case 'pumpkin/nodes':
	    return handleNodesReq(message)
	  case 'pumpkin/response':
	    return handleResponseReq(message) 
  case 'pumpkin/sensor':
	    return handleSensorReq(message) 
  }
    
});

router.get('/call', function(req, res, next) {
  mqttclient.publish('pumpkin/call', 'ALL');
  res.send('Here We Go Again!');
});

router.get('/scripts/:id', function(req, res, next) {
    id = req.params.id;
  mqttclient.publish('pumpkin/response', '0000,'+ id + ',0');
  res.send('Playing Script ID:' + id);
});

router.put('/:id/:setParam(volume|delay|lastresponse)/:value', function(req, res) {
  format = req.query.format;
  id = req.params.id;
  setParam = req.params.setParam;
  value = req.params.value;
  sqlRequest = "UPDATE nodeinfo SET " + setParam + "='" + value + "' WHERE nodeid=" + id 
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      res.status(500).send( "An error has occurred -- " + err);
    }
    else {
		if(format === "html") {
         res.render('update-sub', {'title': 'Updated Node ' + nodeid, 'nodeid': nodeid, 'setParam': setParam, 'value': value});
		}
		else {
		res.json({id: id, status: "updated"});
		}
      
    }
  });
});

function handleRegisterReq (message) {  
    var arr = message.toString().split(",");
	    if (arr[0] == "chip") {
		   console.log( "we have a status message");
		   sqlRequest = "INSERT OR REPLACE INTO 'nodeid' (nodeid, address, type) " +
               "VALUES('" + arr[1] + "', '" + arr[2] + "', '" + arr[3] + "')"
		   db.run(sqlRequest, function(err) {
               if(err !== null) {
                  console.log("An error has occurred -- " + err);
               }
               else {
				  console.log( "Chip " + arr[1] + " Added");
                  db.all("select * FROM nodeinfo WHERE nodeid='" + arr[1] + "'", function(err, row) {
                    if(err !== null) {
                       console.log("An error has occurred -- " + err);
                    }
                    else {
                       if (row[0] !== undefined ) {
				    	     console.log("It is in there");
				       } else {
				           console.log("Not there!!!!");
			  	  	       NodeInfoInsert = "INSERT INTO 'nodeinfo' (nodeid, name, status, volume, delay, lastresponse) " +
                             "VALUES('" + arr[1] + "', '" + arr[1] + "', '0', '20', '100', datetime())"
					       db.run(NodeInfoInsert, function(err) {
                             if(err !== null) {
                                console.log("An error has occurred -- " + err);
                             }
                             else {
				              console.log("Added to NodeInfo on " + Date());
			                 }
			               })
				       }					 
                    }
                  });
				
	           }
            })
	  }
}

function handleNodesReq (message) {  
  console.log('Nodes Message %s', message)
// add status check processing here and updates for prop responses.
  
}

function handleResponseReq (message) {  
    //ScriptID and Script Step completed message format resp,<nodeid>,<scriptid>,<scriptstep>
	//output Action,ScriptID, ScriptStep, track
  var arr = message.toString().split(",");
  var step = 0
  
	  step = +arr[2]+1
	  scriptid = arr[1]
	  db.all("select max(step) as count FROM scriptsteps WHERE scriptid='" + scriptid + "'", function(err, row) {
                    if(err !== null) {
                       console.log("An error has occurred -- " + err);
                    }
                    else {
					  if (row[0].count >= step) {
						console.log('Run Step ' + step )
                        db.all("select nodeid, action, scriptid, track FROM scriptsteps WHERE step='" + step + "' and scriptid='" + scriptid + "'", function(err, row) {
                          if(err !== null) {
                            console.log("An error has occurred -- " + err);
                          }
                          else {
                            row.forEach(function(entry) {
                            console.log("Node: " + entry.nodeid + " Performing " + entry.action + "," + entry.scriptid + "," + step + "," + entry.track);
							var msg = entry.action + "," + entry.scriptid + "," + step + "," + entry.track
							var topic = 'pumpkin/'+ entry.nodeid
							mqttclient.publish(topic, msg)
                           });

					      }
  					    });
					  } else {
						  console.log("Script " + scriptid + " Completed");
					  }
					}
	  });  
	  

  //Check for next step and trigger
  
  
}

function handleSensorReq (message) {  
  console.log('Nodes Message %s', message)
  //format of message to server <nodeid>,triggered
   var arr = message.toString().split(",");
  //Sensor ID 
  db.all("select count(*) as count FROM sensorscript WHERE nodeid='" + arr[0] + "'", function(err, row) {
                    if(err !== null) {
                       console.log("An error has occurred -- " + err);
                    }
                    else {
					//IF special trigger start script defined in req
                      var randScript = getRandomInt(1, row[0].count+1);
					  console.log("Playing Script " + randScript)
					  var msg = "000," + randScript + ",0"
					  mqttclient.publish('pumpkin/response', msg)

					}
	  });

  
}
/*

*/

module.exports = router;
