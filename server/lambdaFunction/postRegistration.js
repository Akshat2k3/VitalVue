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
    const cognitoUserId = userAttributes.sub;

    try {
        await pool.query(
            'UPDATE users SET cognito_id = $1 WHERE email = $2 RETURNING *',
            [cognitoUserId, email]
        );

        console.log('User successfully updated in the database with cognito_id:', cognitoUserId);
        return event;
    } catch (error) {
        console.error('Database error:', error.message);
        throw new Error(`Failed to update user in database. Reason: ${error.message}`);
    }
};
