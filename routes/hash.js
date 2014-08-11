'use strict';

var router = require('express').Router();
var DB = require('redis').createClient();

module.exports = router;

router.route('/')
  .get(function(req, res, next) {
    var api;

    api = 'GET    /HGET/:key\n' +
          'POST   /HSET/:key\n' +
          'DELETE /HDEL/:key\n';

    res.end(api);
  })

router.get('/hget', function(req, res) {
  DB.keys('*', function(err, keys) {
    res.send(keys);
  })
});


router.post('/hset/', function(req, res) {
  var name, key, val, entry = {};

  name = req.body.name;
  key = req.body.key;
  val = req.body.val;

  if(typeof val === 'object') val = JSON.stringify(val);

  entry[key] = val;

  DB.hset(name, key, val, function(err) {
    if(err) {
      console.log(err);
      next(err);
      return;
    }
    res.json(entry);
  });
});
