import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
let pool;

export default function getPool() {
    if (pool) {
      return pool;
    }
    const config = {
        connectionLimit: 100,
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        port: process.env.SQL_PORT,
        debug:false,
        waitForConnections: true,
        multipleStatements: true
    };
    return mysql.createPool(config);
};