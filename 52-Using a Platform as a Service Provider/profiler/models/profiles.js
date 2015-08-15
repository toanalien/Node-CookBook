var mongodb = require('mongodb'),
  client = mongodb.MongoClient,
  ObjectID = mongodb.ObjectID,
  profs;

client.connect('mongodb://nodejitsu_dmc2:pq6a6o2dn6sdkbh5jikbdn78ci@ds045978.mongolab.com:45978/nodejitsu_dmc2_nodejitsudb5229403309', function (err, db) {
  if (err) { console.log(err); return; }
  profs = db.collection('profiles');
  [pull, del, add].forEach(function (m) { exports[m.name] = m; })
});

function pull(page, cb) {  
    var p = {},
      //rowsPer = 10, //realistic rowsPer
      rowsPer = 2, 
      skip, errs;   
    page = page || 1;
    skip = (page - 1) * rowsPer;
    
    profs.find({}, {limit: rowsPer, skip: skip})
      .each(function (err, doc) {
        if (err) { errs = errs || []; errs.push(err); }
        if (doc) {
          p[doc._id] = doc;
          delete p[doc._id]._id;
          return;
        }
        cb(errs, p);
      });
}

function del(profile, cb) {
  profs.remove({_id: ObjectID(profile)}, cb);
}

function add(profile, cb) {
  profs.insert(profile.profile, cb);
}

exports.pull = exports.add = exports.del = function (_, cb) { 
  cb(Error('Profiles Not Ready'))
}
