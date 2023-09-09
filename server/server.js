const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;
const dbPath = path.join(__dirname, 'data/db.json');

app.use(express.json());

app.get('/api/users', (req, res) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if(err) {
            res.status(500).send('Server Error');
            return;
        }
        const { users } = JSON.parse(data);
        res.json(users);
    });
});

app.post('/api/users', (req, res) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if(err) {
            res.status(500).send('Server Error');
            return;
        }
        const db = JSON.parse(data);
        const newUser = {
            id: db.users.length + 1,
            ...req.body
        }
        db.users.push(newUser);
        fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                res.stastus(500).send('Server Error');
                return;
            }
            res.status(201).json(newUser);
        });
    });
});

app.listen(PORT, () => { 
    console.log(`Server started on port: ${PORT}.`) 
});