var child_process = require('child_process');

/**
 * CGI interface:  Run a program and send stdout as the request response.
 */
module.exports = function(path, args, env, req, res){

    var cgi = child_process.spawn(path, args, {env: env});
    req.pipe(cgi.stdin);

    var stderr = "";
    cgi.stderr.setEncoding('utf8');
    cgi.stderr.on('data', function(chunk) {
      stderr += chunk;
    });

    var bits = [];

    cgi.stdout.on('data', function (chunk) {
        bits.push(chunk);
    });

    cgi.on('exit', function (code, signal) {
        res.writeHead(200);
        res.end(bits.join(''));
    });
};
