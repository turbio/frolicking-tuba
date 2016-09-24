const db = require('./db');

//models
const User = require('./models/user');

//options
const force = process.argv.includes('--force');

console.log('SYNCING', force ? 'FORCEFULLY' : 'NON-FORCEFULLY');

Promise.resolve().then(() =>
  console.log('SYNCING USER SCHEMA') || User.sync({ force })
).then(() =>
  db.close()
).catch((err) =>
  console.log('MIGRATION ERROR:', err)
);
