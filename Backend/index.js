const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let conn = null;

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8820
    });
}

// GET users
app.get('/users', async (req, res) => {
    const result = await conn.query('SELECT * FROM users');
    res.json(result[0]);
});

const validateData = (userData) => {
    let errors = [];

    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ');
    }

    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }

    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }

    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }

    if (!userData.interests) {
        errors.push('กรุณาเลือกงานอดิเรก');
    }

    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }

    return errors;
}

// POST users
app.post('/users', async (req, res) => {
    try {

        let user = req.body;

        const errors = validateData(user);

        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            };
        }

        const result = await conn.query(
            `INSERT INTO users 
            (firstName, lastName, age, gender, interests, description) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                user.firstName,
                user.lastName,
                user.age,
                user.gender,
                user.interests,
                user.description
            ]
        );

        res.json({
            message: 'User added successfully',
            data: result[0]
        });

    } catch (error) {

        const errorMessage = error.message || 'Error creating user';
        const errors = error.errors || [];

        console.error('Error creating user:', error.message);

        res.status(500).json({
            message: errorMessage,
            errors: errors
        });
    }
});

// GET user by id
app.get('/users/:id', async (req, res) => {
    try {

        let id = req.params.id;

        const result = await conn.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (result[0].length == 0) {
            throw { statusCode: 404, message: `User with id ${id} not found` };
        }

        res.json({
            message: `User fetched successfully`,
            data: result[0][0]
        });

    } catch (error) {

        let statusCode = error.statusCode || 500;

        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
});

// DELETE user
app.delete('/users/:id', async (req, res) => {

    try {

        let id = req.params.id;

        const result = await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (result[0].affectedRows == 0) {
            throw { statusCode: 404, message: `User with id ${id} not found` };
        }

        res.json({
            message: `User deleted successfully`
        });

    } catch (error) {

        let statusCode = error.statusCode || 500;

        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
});

app.listen(port, async () => {
    await initMySQL();
    console.log(`Server running on port ${port}`);
});