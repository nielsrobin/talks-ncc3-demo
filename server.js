if (!process.env.NODE_ENV) process.env.NODE_ENV='devlopment'

var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , cars = require('./server/api/cars')

var app = express()

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) //parses json, multi-part (file), url-encoded
  app.use(app.router) //need to be explicit, (automatically adds it if you forget)
  app.use(express.static(clientDir)) //should cache static assets
})

app.configure('development', function(){
  app.use(express.errorHandler());
})

app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/api/cars', cars.list) //this doesn't have to mach your dir naming scheme

var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});


