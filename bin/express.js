var http    = require('http')
  , express = require('express')
  , app     = express()
  , cgi     = require('../lib/cgi')
  , port    = 1782;

app.use('/hello/:something([0-9a-zA-Z]*)', test);
function test(req, res) {
    var selector = req.params.something||'hello';
    cgi(__dirname+'/hello.sh', [selector], {}, req, res);
}

var server = http.createServer(app);
console.log('Listening on port', port);
console.log('\nTo test, please visit:  \n\nhttp://localhost:'+port+'/hello/Eugene\n\nor run:\n\n./bin/test.sh\n');
server.listen(port);

