/**
 * @author stan229
 */
var http = require('http')
var io = require('socket.io')
var path = require('path')
var fs = require('fs')

var clients = [];

var server = http.createServer(function(req, res){
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
	var fileName = path.join(process.cwd(),"../experiments/public/index2.html")
	fs.readFile(fileName,"binary",function(err,file) {
		if (err) {
			console.log(err)
		} 
		res.write(file,"binary")
		res.end()
	})
});
server.listen(8000)

var socket = io.listen(server)
socket.on('connection', function(client){
    client.on('message', function(jsonString){
        parseMessage(jsonString)
    })
    client.on('disconnect', function(){
        console.log("disco")
    })
    
    
});

function parseMessage(jsonString){
	var json = JSON.parse(jsonString)
	console.log(json)
	switch (json.messageType) {
		case 'connect':
			clients[clients.length] = json
			json.clientId = clients.length
			broadcastHeartbeat();
			break;
		case 'disconnect':
			abc.splice(json.clientId,1)
			broadcastHeartbeat();
			break;
		case 'pomo':
			break;
		case 'pomoBreak':
			break;
		case 'longBreak':
			break;
		case 'interrupt':
			break;
		default:
		break;
	}

}

function broadcastHeartbeat() { 
	socket.broadcast(JSON.stringify(clients))
}






