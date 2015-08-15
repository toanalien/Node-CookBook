var csv = require('csv')(),  
  data = [
    ['a','b','c','d','e','f','g'], 
    ['h','i','j','k','l','m','n']
  ];

csv.to.options({
  delimiter: '~',
  quote: '|',
  quoted: true  
});

csv.from.array(data).to.path('./custom_data.csv');







