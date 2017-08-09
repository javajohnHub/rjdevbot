var Xray = require('x-ray');
var x = Xray();

var method = encodeURIComponent('checkdate');
method = method.replace('_', '-');
x('http://php.net/manual/en/function.' + method, {
  items: x('body', [{
    synopsis: '.methodsynopsis',
    description: '.rdfs-comment'
  }])
})(function(err, result) {
    if (err) console.log(err);
    console.log(result.items[0].synopsis.replace(/\s\s+/g, ' '));
    console.log(result.items[0].description);
});
