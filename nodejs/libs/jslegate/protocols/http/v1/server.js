var http = require('http'),
    url = require('url'),
    server;


module.exports = class HttpServerV1 {
  constructor(){

  }

  start(portNum, router){

      function createServer(portNum, router, req, res){
            server = http.createServer(function (req, res) {  //CONTROLLER

            // client path request
            let path = url.parse(req.url, req.port=portNum).pathname;
          
            //see sse response for use with req.on
            router.loadPage(res,path, req);
          
            }).listen(portNum);
            console.log("http server is listening on port: " + portNum);


        return server;
      }
      server = createServer(portNum, router); return;
   }
}