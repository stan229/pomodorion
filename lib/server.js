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
socket.on('connection', function(socketClient){
    socketClient.on('message', function(jsonString){
        parseMessage(socketClient,jsonString)
    })
    socketClient.on('disconnect', function(){
        console.log("disco")
    })
    
    
});

function parseMessage(socketClient,jsonString){
	var client = JSON.parse(jsonString)
//	console.log(client)
	switch (client.messageType) {
		case 'connect':
			client.clientId = clients.length
			clients[clients.length] = client						
			client.messageType="confirmConnect"
			var array = [client]
			socketClient.send(JSON.stringify(array))
//			broadcastHeartbeat();
			break;
		case 'disconnect':
			clients.splice(client.clientId,1)
			broadcastHeartbeat();
			break;
		case 'pomo':
			clients[client.clientId] = client
			clients[client.clientId].status = "pomo"
			broadcastHeartbeat()
			break;
		case 'pomoBreak':
			clients[client.clientId] = client
			clients[client.clientId].status = "break"
			broadcastHeartbeat()
			break;
		case 'longBreak':
			clients[client.clientId] = client
			break;
		case 'interrupt':
			clients[client.clientId] = client
			break;
		default:
		break;
	}
	console.log(clients)


}

function broadcastHeartbeat() { 
	socket.broadcast(JSON.stringify(clients))
}
function broadcastFromClient(socketClient)  {
	 socketClient.broadcast(null)
}








