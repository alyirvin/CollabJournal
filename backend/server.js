const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userCollection = require('./mongodb.js')
const bcrypt = require('bcrypt');
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

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userCollection({
            name: user,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.send('User added successfully');
    } catch(error) {
        res.send('Hashing failed');
    }
  });

app.post('/Login', async (req, res) => {
    const {user, email, password} = req.body;
    try {
        const check = await userCollection.findOne({name: user, email: email});
        if(check) {
            try {
                const checkPassword = await bcrypt.compare(password, check.password);
                if(checkPassword) {
                    res.send("Exist") 
                }
                else {
                    res.send("Wrong Password")
                }
            }
            catch(e) {
                res.send("Wrong Password")
            }
        }
        else {
            res.send("UserEmail not found")
        }
    }
    catch(e) {
        res.send("UserEmail not found")
    }
})
app.listen(5001, () => {
    console.log('Server is running on port 5001')
})
