/*
* Primary file for API
*
*/

// Dependency
var http = require('http');
var url = require('url');


// The server shoukd respond to all request with string
var server = http.createServer(function(req,res){
    // Get url and parse it
    parseUrl = url.parse(req.url,true);
    
    // Get the path
    var path = parseUrl.pathname;
    var trimPath = path.replace(/^\/+|\/+$/g,'')

    // Get the HTTP request
    var method = req.method.toLowerCase();



    // Send the response
    res.end('Hello word');

    //Log the request path
    console.log('Request receved on path: ' + trimPath + ' with this method ' + method);
    
})


// Start the server and have ir listen in port 3000

server.listen(3000,function(){
    console.log('Console is linten in port 3000 now.');
})