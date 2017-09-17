PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "nodeid" ("nodeid" char PRIMARY KEY, "address" VARCHAR(255), "type" char);
INSERT INTO nodeid VALUES('0000','0.0.0.0','Prop');
INSERT INTO nodeid VALUES('000','0.0.0.0','Sensor');
CREATE TABLE IF NOT EXISTS "nodeinfo" ("nodeid" char PRIMARY KEY, "name" char, "status" int, "lastresponse" char, "volume" int, "delay" int);
INSERT INTO nodeinfo VALUES('0000','FakeProp',0,datetime(),20,100);
INSERT INTO nodeinfo VALUES('000','FakeSensor',0,datetime(),20,100);
CREATE TABLE IF NOT EXISTS "scriptid" ("scriptid" INTEGER PRIMARY KEY AUTOINCREMENT, "scriptname" char);
INSERT INTO scriptid VALUES(1,'Give Them Candy');
CREATE TABLE IF NOT EXISTS "scriptsteps" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "scriptid" INTEGER, "step" int, "nodeid" char, "action" char, "track" INTEGER);
INSERT INTO scriptsteps VALUES(1,1,1,'0000','play',1);
INSERT INTO scriptsteps VALUES(2,1,2,'0000','play',2);
INSERT INTO scriptsteps VALUES(3,1,3,'0000','play',3);
INSERT INTO scriptsteps VALUES(4,1,4,'0000','play',4);
INSERT INTO scriptsteps VALUES(5,1,5,'0000','play',5);
INSERT INTO scriptsteps VALUES(6,1,6,'0000','play',6);
CREATE TABLE IF NOT EXISTS "sensorscript" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "nodeid" char, "scriptid" INTEGER);
INSERT INTO sensorscript VALUES(1,'000',1);
COMMIT;


