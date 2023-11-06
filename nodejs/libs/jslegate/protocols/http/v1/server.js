var http = require('http'),
    url = require('url'),
    server;

module.exports = class HttpServerV1 {
  constructor(){}

  start(portNum, router){
      function createServer(portNum, router, req, res){
            server = http.createServer(function (req, res) {
            // client path request
            let path = url.parse(req.url, req.port=portNum).pathname;
          
            router.loadPage(res,path,req);
          
            }).listen(portNum);
            console.log("http server is listening on port: " + portNum);

        return server;
      }
      server = createServer(portNum, router); return;
   }
}