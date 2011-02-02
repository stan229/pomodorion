/**
 * @author stan229
 * Simple socket.io test
 */
var http = require('http') 
var io = require('socket.io')
var path = require('path')
var fs  = require('fs')

var server = http.createServer(function(req, res){
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
	var fileName = path.join(process.cwd(),"/public/index.html")
	fs.readFile(fileName,"binary",function(err,file) {
		if (err) {
			console.log(err)
		} 
		res.write(file,"binary")
		res.end()
	})
})
server.listen(8000)


var socket = io.listen(server);

socket.on('connection', function(client){
console.dir(client)	
  // new client is here!
  client.on('message', function(data){ console.log(data) })
  client.on('disconnect', function(){ console.log("disco") })
  for(var i = 0; i < 10; i++) { 
		client.send(i)
	}
	
});
