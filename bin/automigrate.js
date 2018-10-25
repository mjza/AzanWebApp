var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.azan;
ds.automigrate('Account', function(err) {
  if (err) throw err;

  var accounts = [
    {
      email: 'john.doe@ibm.com',
      password: '1',
      createdAt: new Date(),
      lastModifiedAt: new Date()
    },
    {
      email: 'jane.doe@ibm.com',
      password: '2',
      createdAt: new Date(),
      lastModifiedAt: new Date()
    }
  ];
  var count = accounts.length;
  accounts.forEach(function(account) {
    app.models.Account.create(account, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});
