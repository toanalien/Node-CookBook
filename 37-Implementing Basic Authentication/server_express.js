var express = require('express');
var connect = require('connect');

var username = 'dave',
  password = 'ILikeBrie_33',
  realm = 'Node Cookbook';

var app = express();

app.use(connect.basicAuth(function (user, pass) {
  return username === user && password === pass;
}, realm));

app.get('/:route?', function (req, res) {
  res.end('Someone likes soft cheese!');
});

app.listen(8080);
