var path = require("path");
var fs = require("fs");
var app = require(path.resolve(__dirname, "../server/server"));
var ds = app.datasources.azan;
var fileName = path.resolve(__dirname, "../server/model-config.json");
var file = require(fileName);
var sSchema = "azan",
  aTables = ["countries","cities","times"];
var i = aTables.length;
for (var j = 0; j < aTables.length; j++) {
  var sTable = aTables[j];
  ds.discoverSchema(sTable, { schema: sSchema, associations: true }, function(
    err,
    schema
  ) {
    var _sTable = this.sTable;
    if (err) throw err;
    var json = JSON.stringify(schema, null, "  ");
    console.log(json);
    fs.writeFile(
      path.resolve(__dirname, "../common/models/"+ _sTable + ".json") ,
      json,
      function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file '" + _sTable + ".json'" + "was saved!");
      }
    );
    var sString =
      "'use strict';\n\n" +
      "module.exports = function(" +
      schema.name +
      ") {\n\n};\r";
    fs.writeFile(
      path.resolve(__dirname, "../common/models/"+ _sTable + ".js") ,
      sString,
      function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file '" + _sTable + ".js'" + "was saved!");
      }
    );
    file[schema.name] = {
      dataSource: sSchema,
      public: true
    };
    i--;
    if (i === 0) {
      ds.disconnect();
      fs.writeFile(fileName, JSON.stringify(file), function(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log("writing to " + fileName);
      });
    }
  }.bind({sTable: sTable}));
}
