import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
let pool;

export default function getPool() {
    if (pool) {
      return pool;
    }
    return mysql.createPool(process.env.DATABASE_URL);
};