const express = require('express');
const pool = require('./pg.js');
const cognito = require('./cognito.js');
const app = express();
const PORT = 5000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received ${req.method} request on ${req.path}`);
    next();
});

app.get('/api/users', async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/api/register', (req, res) => {
    const { name, email, password, gender, birthdate } = req.body;

    cognito.registerUser({ name, email, password, gender, birthdate }, (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: "Registration successful!", user: user });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    cognito.authenticateUser(username, password);
    res.send('Authentication attempted. Check server logs for status');
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})