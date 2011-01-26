var sys = require('sys')
var path = require('path')
var fs = require('fs')
var http = require('http')
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
