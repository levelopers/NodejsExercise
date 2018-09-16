const url = require('url');
let parseIt = function (url_string) {

  let parseQuery = true;
  let slashHost = true;

  let urlObj = url.parse(url_string, parseQuery, slashHost);

//url properties
  console.log('input: ' + url_string);
  console.log('url properties: ');
  console.log('------------------------');
  console.log('href : ' + urlObj.href);
  console.log('host : ' + urlObj.host);
  console.log('host name : ' + urlObj.hostName);
  console.log('port : ' + urlObj.port);
  console.log('path : ' + urlObj.path);

//url query properties
  let query = urlObj.query;
  console.log('type : ' + query.type);
  console.log('action : ' + query.action);
  console.log('id : ' + query.id);
  // for (x of urlObj.query) {
  //   console.log(x+ ' : ' + urlObj.query[x]);
  // }
}
//create server
const http = require('http');
http.createServer(function (req,res) {
  res.writeHead(200,{'content-Type': 'text/plain'});
  res.end('Server running at 3000');

//headers
  console.log('headers' + req.headers);
  // for (x of req.headers) {
  //   console.log(x + ' : ' + req.headers[x]);
  // }
  console.log('method : ' + req.method);
  console.log('domain : ' + req.domain);
  //call parse
  parseIt('https://www.tutorialkart.com/nodejs/split-a-url-into-readable-parts-in-node-js/');
}).listen(3000);
console.log('local server is running');
