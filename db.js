const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'belajar_backend',
    password: 'riskaajaudah21',
    port: 5432,
})

module.exports = pool