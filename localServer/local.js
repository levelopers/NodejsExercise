const http = require('http');
http.createServer(function (request,response) {
//   console.log("request: " + request);
// console.log("\nREQUEST OBJECT KEYS (own property):");
// for(k of request) if(request.hasOwnProperty(k)) console.log("key: " + k);

// This object has a property called "url" which holds the part of the url
//display keys and value pairs in request
console.log("\nREQUEST OBJECT KEYS (own property):");
   for(k in request) {
        if(request.hasOwnProperty(k)){
           console.log("KEY: " + k + " VALUE: " + typeof request[k])
        }
    }

  // html head
  response.writeHead(200,{'Context-Type':'text/plain'});

  //write content to screen
  response.write('Hello ');

  //get url string after '?name=' and display them
  let urlString = request.url;
  let index = urlString.indexOf('?name=');
  if (index>0) {
    let name = urlString.substring(index+'?name='.length, urlString.length);
    response.write(name+'\n');
  }else response.write('World');
  response.end();

//localhost:8080
}).listen(8080);
