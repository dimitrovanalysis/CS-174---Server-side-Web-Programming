var http = require('http');
var fs    = require('fs');

var twitter = JSON.parse(
fs.readFileSync(__blog + '/public/favs.json') );
var htmlPage = fs.readFileSync(__blog + '/views/index.html');



http.createServer((req, res) => {
if (req.url == "/") {
    res.writeHead(200, { 'Content-type' : 'text/html' });
    res.write( htmlPage );
    res.end();
} else if (req.url == "/tweet") {
    let tweets = [];

    twitter.forEach((tweet) => {
      let twit = {};

      twit.text   = tweet.text;
      twit.author = tweet.user.name;
      twit.time   = tweet.createdAt;

      tweets.push(twit);
    });

    res.end(JSON.stringify(tweets));

} else if (req.url == "/user") {
    let users = [];

    twitter.forEach((tweet) => {
      if (users.indexOf(tweet.user.name) == -1)
      users.push(tweet.user.name);
    });

    res.end(JSON.stringify(users));
} else
    res.end("Can't GET/POST to url " + req.url);
}).listen(3000);