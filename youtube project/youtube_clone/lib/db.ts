import mysql from 'mysql2';

// const connection = mysql.createPool({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER, // Use your MySQL username
//     password: process.env.DATABASE_PASSWORD, // Use your MySQL password
//     database: process.env.DATABASE_NAME,
// });

const dbConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  };

export default dbConfig;
