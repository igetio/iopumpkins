# pumpkinpi
Pumpkin control project
The purpose of this project is to create a raspberry pi controller for a haloween display. It uses node and AP mode for the PI. It uses esp8266 wifi cards to communicate with the pi and receive notification from the pi.



##Setting up Node site:
(The version on my pi is currently v0.12.6)

1. Go to http://node-arm.herokuapp.com/ and follow the steps to download and install node.js 
2. Run `sudo apt-get install sqlite3`
3. Download this repo and extract it
4. Navigate to the nodejs/pumpkin folder and run `npm install`
5. Start the node server `npm start` 
  - Running Node as Background Process:
    1. Run `sudo npm install -g forever`
    2. from the `nodejs/pumpkin` folder run `forever start -w ./bin/www`
