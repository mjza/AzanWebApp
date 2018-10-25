var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.azan;
var i = 4;
ds.discoverSchema('Account', {schema: 'azan'}, function(err,
    schema) {
  if (err) throw err;
  var json = JSON.stringify(schema, null, '  ');
  console.log(json);
  i--;
    if(i === 0){
      ds.disconnect();
    }
});
ds.discoverSchema('Countries', {schema: 'azan'}, function(err,
  schema) {
if (err) throw err;
var json = JSON.stringify(schema, null, '  ');
console.log(json);
i--;
    if(i === 0){
      ds.disconnect();
    }
});
ds.discoverSchema('Cities', {schema: 'azan'}, function(err,
  schema) {
if (err) throw err;
var json = JSON.stringify(schema, null, '  ');
console.log(json);
i--;
    if(i === 0){
      ds.disconnect();
    }
});
//
ds.discoverSchema('Times', {schema: 'azan'}, function(err,
  schema) {
if (err) throw err;
var json = JSON.stringify(schema, null, '  ');
console.log(json);
i--;
    if(i === 0){
      ds.disconnect();
    }
});