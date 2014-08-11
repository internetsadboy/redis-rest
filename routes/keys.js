'use strict';

var router = require('express').Router();
var DB = require('redis').createClient();

module.exports = router;

router.route('/')
  .get(function(req, res, next) {
    DB.keys('*', function(err, keys) {
      if(err) {
        console.log(err);
        next(err);
        return;
      }
      res.json(keys);
    });
  })

  .post(function(req, res, next) {
    var key, val;

    key = Object.keys(req.body)[0];
    val = req.body[key];

    DB.set(key, val, function(err) {
      if(err) {
        console.log(err);
        next(err);
        return;
      }
      res.send(val);
    });
  });

router.route('/:key')
  .get(function(req, res, next) {
    var key;

    key = req.params.key;

    DB.get(key, function(err, key) {
      if(err) {
        console.log(err);
        next(err);
        return;
      }
      res.send(key);
    });
  })

  .put(function(req, res, next) {
    var key, val;

    key = req.params.key;
    val = req.body.val;

    DB.get(key, function(err, value) {
      if(err) {
        console.log(err);
        next(err);
        return;
      }
      DB.set(key, val, function(err) {
        if(err) {
          console.log(err);
          next(err);
          return;
        }
        res.send(val);
      });
    });
  })

  .delete(function(req, res, next) {
    var key;

    key = req.params.key;

    DB.del(key, function(err) {
      if(err) {
        console.log(err);
        next(err);
        return;
      }
      res.send('');
    });
  });
