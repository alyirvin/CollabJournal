const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userCollection = require('./src/mongodb.js')
mongoose.connect("mongodb+srv://test_ili:justtesting@collaborativejournal.itlf7.mongodb.net/?retryWrites=true&w=majority&appName=CollaborativeJournal")
.then(() => {
    console.log("mongodb connected");
})
.catch(() => {
    console.log("failed to connect")
})
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post('/Signup', async (req, res) => {
    const {user, email, password} = req.body;
    const newUser = new userCollection({
        name: user,
        email: email,
        password: password
    })
    await newUser.save();
    res.send('User added successfully');
  });

app.post('/Login', async (req, res) => {
    const {user, email, password} = req.body;
    try {
        const check = await userCollection.findOne({name: user, email: email, password: password})
        if(check) {
            res.send("Exist")
        }
        else {
            res.send("Not found")
        }
    }
    catch(e) {
        res.send("error")
    }
})
app.listen(5001, () => {
    console.log('Server is running on port 5001')
})
//TODO verify what kind of error the login info has
