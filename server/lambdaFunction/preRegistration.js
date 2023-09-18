const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }

});

exports.handler = async (event, context) => {
    const { request } = event;
    const { userAttributes } = request;

    const email = userAttributes.email;
    const name = userAttributes.name;
    const gender = userAttributes.gender;
    const birthdate = userAttributes.birthdate;
    const cognitoUserId = userAttributes.email || userAttributes.sub;

    console.log(event);

    try {
        await pool.query(
            'INSERT INTO users (cognito_id, name, email, gender, birthdate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [cognitoUserId, name, email, gender, birthdate]
        );

        return event;
    } catch (error) {
        console.error('Database error:', error.message);
        throw new Error(`Failed to save user to database. Reason: ${error.message}`);
    }
};

