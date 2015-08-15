var csv = require('csv')(),  
  data = [
    ['a','b','c,"','d','e','f','g'], 
    ['h','i','j','k','l','m','n']
  ];

csv.from.array(data).to.path('./data.csv');






