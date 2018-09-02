# pumpkinpi
Pumpkin control project
The purpose of this project is to create a raspberry pi controller for a haloween display. It uses node and AP mode for the PI. It uses esp8266 wifi cards to communicate with the pi and receive notification from the pi.

## Installing RabbitMQ and MQTT
1. Install Rabbitmq
    1. Run `sudo apt-get install rabbitmq-server`
2. Install MQTT Plugin
    1. Run `rabbitmq-plugins enable rabbitmq_mqtt`
    2. Run `rabbitmqctl add_user mqtt-test mqtt-test`
    3. Run `rabbitmqctl set_permissions -p / mqtt-test ".*" ".*" ".*"`
    4. Run `rabbitmqctl set_user_tags mqtt-test management`
3. Optional - Install rabbit admin site
    1. Run `rabbitmq-plugins enable rabbitmq_management`
    2. Create Admin account for login
        1. Run `rabbitmqctl add_user admin admin-password`
        2. Run `rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"`
        3. Run `rabbitmqctl set_user_tags admin administrator`
    3. Connect to Console via https://<SERVERNAME>:15672

## Setting up Node site:
(The version on my pi is currently v8.x LTS)

1. Install node.js 
    1. Run `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
    2. Run `sudo apt install -y nodejs`
2. Install sqlite3
    1. Run `sudo apt-get install sqlite3`
3. Download this repo and extract it
4. Navigate to the nodejs/pumpkin folder and run `npm install`
    1. Optional update dependencies
        1. Run `sudo npm install -g npm-check-updates` 
        2. Run `ncu -u`
        3. Run `npm install`
5. Create the database with `sqlite3 pumpkinpi.db < pumpkinpi.sql`
5. Start the node server `npm start` 
  - Running Node as Background Process:
    1. Run `sudo npm install -g forever`
    2. from the `nodejs/pumpkin` folder run `forever start -w ./bin/www`
