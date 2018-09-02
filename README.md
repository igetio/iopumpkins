# pumpkinpi
Pumpkin control project
The purpose of this project is to create a raspberry pi controller for a haloween display. It uses node and AP mode for the PI. It uses esp8266 wifi cards to communicate with the pi and receive notification from the pi.



##Setting up Node site:
(The version on my pi is currently v8.x LTS)

1. Install node.js 
a. Run `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
b. Run `sudo apt install -y nodejs`
2. Install sqlite3
a. Run `sudo apt-get install sqlite3`
3. Download this repo and extract it
4. Navigate to the nodejs/pumpkin folder and run `npm install`
a. Optional update dependencies
i. Run `sudo npm install -g npm-check-updates` 
ii. Run `ncu -u`
iii. Run `npm install'
5. Create the database with `sqlite3 pumpkinpi.db < pumpkinpi.sql`
5. Start the node server `npm start` 
  - Running Node as Background Process:
    1. Run `sudo npm install -g forever`
    2. from the `nodejs/pumpkin` folder run `forever start -w ./bin/www`
