const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kigali@2023',
    database: 'hellodb'
});

db.connect(err => {
    if (err) { console.error('Error connecting: ' + err.stack); return; }
    console.log('Connected to database as ID ' + db.threadId);
});

app.get('/hello', (req, res) => {
    db.query('SELECT text FROM hello WHERE user_id=1', (err, results) => {
        console.log(results);
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length > 0) {
            res.json({ text: results[0].text });
        } else {
            res.status(404).json({ error: 'No text found' });
        }
    });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
