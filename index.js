/** Include the required packages */
var fs = require("fs");
var http = require("http");
var https = require("https");
var httpProxy = require("http-proxy");
var proxy = httpProxy.createServer();
var config = require("./config");

/** Redirect http:// traffic to https:// */
http.createServer(function (req, res) {
  res.writeHead(301, {
    "Location": "https://" + req.headers.host + req.url
  });
  res.end();
}).listen(80);

https.createServer({
  /** Get the SSL certificate and key */
  key: fs.readFileSync(config.ssl.key),
  cert: fs.readFileSync(config.ssl.cert)
}, function (req, res) {
  /** Split the requested URL path, ex: /server1/pathto/myfile.html */
  var path = req.url.split("/");
  /** The first value is blank and not needed, so shift it off the beginning of the array */
  path.shift()
  /** Shift the first folder name from the path, ex: server1 */
  var dir = path.shift();

  if (typeof config.routes.folder[dir] !== 'undefined') {
    /** Since the first folder name was shifted off of the array, this will result in ex: pathto/myfile.html */
    req.url = path.join("/");
    proxy.web(req, res, { target: config.routes.folder[dir] });
  }
  else {
    /** No matching folder found, using the default route */
    proxy.web(req, res, { target: config.routes.default });
  }
}).listen(443, function () {
  console.log("Listening Ports: 80, 443");
});
