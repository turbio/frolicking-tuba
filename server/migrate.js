const db = require('./db');

//models
const User = require('./models/user');
const Integration = require('./models/integration');

//options
const force = process.argv.includes('--force');

console.log('syncing', force ? 'FORCEFULLY' : 'non-forcefully');

Promise.resolve().then(() =>
  console.log('syncing User schema') || User.sync({ force })
).then(() =>
  console.log('syncing Integration schema') || Integration.sync({ force })
).then(() =>
  db.close()
).catch((err) =>
  console.log('migration error:', err)
);
