require('dotenv').config();
const config = {

    database: {

        mysql: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST_ADDRESS,
            port: process.env.DB_PORT,
            dialect: process.env.DB_DIALECT,
            database: process.env.DB_NAME,
            logging: false,
            timezone: "+03:00",
        }
    },

};


module.exports = config;
