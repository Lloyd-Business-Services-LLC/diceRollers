//diceRoller node.js server implementation
const Legate = require('./libs/jslegate/index.js');
const Router = require('./public/router.js');
var PORT = 8001;
var portReq = process.argv[2];
if (!Number.isNaN(portReq) && portReq >= 1024 && portReq <= 65535){
  PORT = process.argv[2];
}
var hts = new Legate.httpServerV1;
hts.start(PORT,Router);