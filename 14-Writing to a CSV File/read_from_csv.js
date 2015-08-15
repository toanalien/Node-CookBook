var csv = require('csv')();

csv.from.path('./data.csv').to.array(function(data){
    console.log(data);
});






