const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());

let users = []
let counter = 1;


//path = /user
app.get('/users', (req, res) => {
    res.json(users);
});

//path = POST/user
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1;
    users.push(user);
    res.json({
        message: 'User added successfully', 
        user: user});
});

//path = PUT/user/:id
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;
    //หา users จาก id
    let selectedUserIndex = users.findIndex(user => user.id == id)
    //update users นั้น
    if (updatedUser.name) {
        users[selectedUserIndex].name = updatedUser.name
    }
    else {
        users[selectedUserIndex].name = users[selectedUserIndex].name
    }
    //ส่ง response กลับไปว่า update users ที่เลือกสำเร็จแล้ว
    res.json({
        message: `User with id ${id} updated successfully`,
        data : {
            user: updatedUser,
            indexUpdated: selectedUserIndex
        }
    })
})

//path = DELETE/user/:id
app.delete('/users/:id', (req, res) => { 
    let id = req.params.id;
    let selectedUserIndex = users.findIndex(user => user.id == id)
    if (selectedUserIndex !== -1) {
        users.splice(selectedUserIndex, 1);
        res.json({
            message: `User with id ${id} deleted successfully`,
            data: {
                indexDeleted: selectedUserIndex
            }
        })
    } else {
        res.status(404).json({
            message: `User with id ${id} not found`
        });
    }
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});