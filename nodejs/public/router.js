var fs = require('fs');
var url = require('url');
var pageProducer= require('../libs/pageProducer.js');
let publicPath = "/../public/";

exports.loadPage = (res,path,req) =>{
switch(path){
    case '/':
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write(pageProducer.home());
     res.end();
     break;

   case '/diceRoller':
    var qs = url.parse(req.url).search; //deprecated usage -- replace
    
    res.writeHead(200, {'Content-Type': 'text/html'});
     res.write(pageProducer.diceRoller(qs));
     res.end();
     break;

    case '/about':
     res.writeHead(200, {'Content-Type':'text/html'});
     res.write(pageProducer.about());
     res.end();
     break;
     
   case '/favicon.ico':
     res.writeHead(200);
     res.end();
     break;

   case '/inc/style.css':
     res.writeHead(200 ,{'Content-Type': 'text/css'});
     var request = fs.createReadStream(__dirname + publicPath + "/inc/style.css");
     request.pipe(res);
     break;
   
    case '/inc/images/menu.png':
     res.writeHead(200 ,{'Content-Type': 'image/png'});
     var request = fs.createReadStream(__dirname + publicPath + "/inc/images/menu.png");
     request.pipe(res);
     break;

     case '/inc/images/close.png':
     res.writeHead(200 ,{'Content-Type': 'image/png'});
     var request = fs.createReadStream(__dirname + publicPath + "/inc/images/close.png");
     request.pipe(res);
     break;

    default:
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write(pageProducer.home());
     res.end();
     break;
   }
}