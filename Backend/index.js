const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors'); 
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let users = [];
let counter = 1;
let conn = null;

const initMySQL = async() => {
    conn = await mysql.createConnection({   
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8820
    });
}

//path: GET /users สำหรับดึงข้อมูล user ทั้งหมด
app.get('/users', async (req, res) => {
    const result = await conn.query('SELECT * FROM users')
    res.json(result[0]);
});

//path: POST /users สำหรับเพิ่ม user ใหม่
app.post('/users', async (req, res) => {   
    try {
        let user = req.body;
        const result = await conn.query('INSERT INTO users SET ?', user);
        res.json({
            message: 'User added successfully',
            data: result[0]
        })
    } catch(error) {
        res.status(500).json({
            message: 'Error adding user',
            error: error.message
        });
    }
});

//path: GET /users/:id สำหรับดึงข้อมูล user โดย id
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const result = await conn.query(
            'SELECT * FROM users WHERE id = ?',  
            [id]                                 
        )

        if (result[0].length == 0) {
            throw { statusCode: 404, message: `User with id ${id} not found` };
        }

        res.json({
            message: `User with id ${id} fetched successfully`,
            data: result[0][0]
        });
    }
    catch(error) {
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
});

//path: PUT /users/:id (คงแบบเดิมที่ใช้ array)
app.put('/users/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;
    let selectedUserIndex = users.findIndex(user => user.id == id);

    if (selectedUserIndex !== -1) {
        users[selectedUserIndex].firstname = updatedUser.firstname || users[selectedUserIndex].firstname;
        users[selectedUserIndex].lastname = updatedUser.lastname || users[selectedUserIndex].lastname;
        users[selectedUserIndex].age = updatedUser.age || users[selectedUserIndex].age;
        users[selectedUserIndex].gender = updatedUser.gender || users[selectedUserIndex].gender;

        res.json({
            message: `User with id ${id} updated successfully`,
            data : {
                user: users[selectedUserIndex],
                indexUpdated: selectedUserIndex
            }
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

//path: DELETE /users/:id
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
            message: `User with id ${id} deleted successfully`
        });
   } catch(error) {
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });
   }
});

app.listen(port, async () => {
    await initMySQL();
    console.log(`Server is running on port ${port}`);
});