const sql = require('mssql');

const config = {
  user: 'reeveserver1',
  password: 'Imaginecup2024',
  server: 'reeveserver.database.windows.net',
  database: 'ReeveDB',
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to Azure SQL Database');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql, poolPromise
};
