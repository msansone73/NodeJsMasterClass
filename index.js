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

        // Choose the handler this should go to If one is not found, use notFound handler
        var choseHandler = typeof( router[trimPath]) !== 'undefined' ? router[trimPath] : handlers.notFound;

        //Construct the data object to send the handler
        var data = {
            'trimedPath':trimPath,
            'queryStringObject': queryString,
            'method': method,
            'handlers' : handlers,
            'payload': buffer
        };

        // Route to request specified in the router
        choseHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler, or default 
            status= typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called the back by handler,  or default to empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string 
            var payloadString = JSON.stringify(payload);

            // Return de response
            res.writeHead(statusCode);
            res.end(payloadString);

            //Log the request path
            console.log('Returning this response' , statusCode,  payloadString);

        })

    })    
})

// Start the server and have ir listen in port 3000
server.listen(3000,function(){
    console.log('Console is linten in port 3000 now.');
})


//Define a request router
var handlers= {};

// Sample handler
handlers.sample = function(data, callback){
    // Callback a http status code, and a payload object
    callback(406,{'name': 'sample handler'})
};

// Not found handler
handlers.notFound = (data, callback) => {
    callback(404)
};

// Define a request router
var router = {
    'sample':handlers.sample
};