For the installation of app you need to first install following thing.
NodeJS
bower (globally) using npm
gulp(globally) using npm
sails(globally) using npm

This directory has all source code. I means we have client side (AngularJS+HTML5) & server backend(NodeJS/SailsJS).following are the details 

1. client : client side app ( following steps need to perform to run app)
- cd to client directory
- install bower with command. 

$ bower install

- install gulp with command

$ npm install

- run application with following command

$ gulp serve

this will generate local server http://localhost:3000


2. server : API backend (following steps need to perform)
- cd to server directory
- create database into your mysql , db sql added in DB/ directory. db name is "callapp"
- start service using command 
$ sails lift
it will up server on http://localhost:1337

