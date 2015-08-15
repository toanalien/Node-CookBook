//Don't forget, we need mongoDB for this to work!
//sudo mongod --dbpath [a folder for the database]
var client = require('mongodb').MongoClient,  
  profiles = require('./profiles'),
  users = [{name : 'dave', pwd: 'expressrocks'},
           {name : 'MrPage', pwd: 'hellomynamesmrpage'}
          ],
  tx = 2;

profiles = Object.keys(profiles).map(function (key) { return profiles[key]; });

function e(err) { if (!err) {return;} console.log(err); process.exit(); }

function tidy(db) {tx--; return tx || db.close(); }

client.connect('mongodb://nodejitsu_dmc2:1gr99tet8mhplfa6l1ronmtkti@ds045998.mongolab.com:45998/nodejitsu_dmc2_nodejitsudb8641251234', function (err, db) {
    e(err);
    
    //db.dropDatabase(function (err) {
       // e(err);

        db.collection('users').insert(users, function (err) {
          if (err) { return console.log(err); }
          console.log('Added users')
          tidy(db);
        });
  
        db.collection('profiles').insert(profiles, function (err, o) {
          e(err);
          console.log('Added profiles')
          tidy(db);
        });      
        
    //});

});
