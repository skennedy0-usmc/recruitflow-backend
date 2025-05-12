const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recruitflow_db',
  password: 'BosCelts@2025!',
  port: 5432
});

module.exports = pool;
