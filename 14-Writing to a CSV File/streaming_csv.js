var csv = require('csv')();


process.stdin.resume();
csv.options.to.quoted = true;

csv.from.stream(process.stdin).transform(function (row) {
  return row.map(Function.call, ''.toUpperCase)
}).to.stream(process.stdout)






