require('dotenv').config()
const mysql = require("mysql2")

//-------------------------------

const query = (sqlQry, params) => {
    return new Promise((resolve, reject) => {

        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });

        connection.connect((err) => {
            if (err) return console.log(err);
        })

        if (params) {
            connection.query(sqlQry, params, (error, results, fields) => {
                if (error)
                    reject(error);
                else
                    resolve(results);
                connection.end();
            })
        } else {
            connection.query(sqlQry, (error, results, fields) => {
                if (error)
                    reject(error);
                else
                    resolve(results);
                connection.end();
            })
        }

    })
}


module.exports = { query }