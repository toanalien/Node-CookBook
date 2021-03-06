var mongodb = require('mongodb'),
  client = mongodb.MongoClient,
  ObjectID = mongodb.ObjectID,
  profs;

client.connect('mongodb://localhost:27017/profiler', function (err, db) {
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