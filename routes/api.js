const yelp = require('yelp-fusion');

var token = ""

yelp.accessToken("cLtRtRiTihjntorYxDRUdA", "zLt1ruLJdfouqYAKUALRAaf7ulREjDMTTwcp1hv9zXqtW69AMTvFdiVMGplqtvzV").then(response => {
  token = response.jsonBody.access_token;
}).catch(e => {
  console.log(e);
});

var express = require('express');
var fs = require('fs');
var router = express.Router();

//Respond with ajax
router.all('/search/:location', function (req, res, next) {
  const client = yelp.client(token);
  client.search({
    term: 'Bar',
    location: req.params.location
  }).then(response => {
      res.send(response.body);

  }).catch(e => {
    console.log(e);
  });
});


module.exports = router;
