/*
* Primary file for API
*
*/

// Dependency
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// The server shoukd respond to all request with string
var server = http.createServer(function(req,res){
    // Get url and parse it
    parseUrl = url.parse(req.url,true);
    
    // Get the path
    var path = parseUrl.pathname;
    var trimPath = path.replace(/^\/+|\/+$/g,'')

    // Get the HTTP request
    var method = req.method.toLowerCase();

    // Get the query string as an object
    var queryString = parseUrl.query;

    //Get the headers of the object
    var headers = req.headers

    // Get the payload
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data',function(data){
        buffer+= decoder.write(data);
    })
    req.on('end', function(){
        buffer+=decoder.end();

        // Send the response
        res.end('Hello word\n');

        //Log the request path
        console.log('Request receved on path: ' + trimPath + 
        ' with this method ' + method);
        console.log('queryString: ', queryString);
        console.log('header: ',headers);
        console.log('body: ',buffer);

    })


    
    
})


// Start the server and have ir listen in port 3000

server.listen(3000,function(){
    console.log('Console is linten in port 3000 now.');
})