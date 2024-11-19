const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userCollection = require('./userCollection.js');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const journalCollection = require('./journal.js');
const groupCollection = require('./groupCollection.js')
mongoose.connect("mongodb+srv://test:testtest@collaborativejournal.itlf7.mongodb.net/?retryWrites=true&w=majority&tls=true&appName=CollaborativeJournal")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((err) => {
        console.error("failed to connect", err);
    });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post('/Signup1', async (req, res) => {
    try {
        const { username, email } = req.body
        const check = await userCollection.findOne({ username: username, email: email });
        if (check) {
            res.send("User already exists")
        }
        else {
            res.send("User doesn't exist")
        }
    } catch (error) {
        res.send("User doesn't exist")
    }
})
app.post('/Signup2', async (req, res) => {
    try {
        const { username, email } = req.body
        const check = await userCollection.findOne({ username: username, email: email });
        if (check) {
            res.send("User already exists")
        }
        else {
            const { firstName, lastName, username, email, password } = req.body;
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new userCollection({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    password: hashedPassword
                });
                await newUser.save();
                res.send('User added successfully');
            } catch (error) {
                res.send("Hashing failed")
            }
        }
    } catch (error) {
        res.send("Verification Failed")
    }
});

app.post('/Login', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const check = await userCollection.findOne({ username: username, email: email });
        if (check) {
            try {
                const checkPassword = await bcrypt.compare(password, check.password);
                if (checkPassword) {
                    res.send({ status: "Exist", userId: check._id, firstName: check.firstName, lastName: check.lastName })
                }
                else {
                    res.send({ status: "Wrong Password" })
                }
            }
            catch (e) {
                res.send({ status: "Wrong Password" })
            }
        }
        else {
            res.send({ status: "UserEmail not found" })
        }
    }
    catch (e) {
        res.send({ status: "UserEmail not found" })
    }
})


app.post('/ForgotPassword', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userCollection.findOne({ email: email });
        if (!user) {
            return res.status(404).send("Email not found");
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'collaborativejournalteamwebdev@gmail.com', // replace with your email
                pass: 'sjnz oyep miag ufpv' // replace with your email password
            }
        });

        let info = await transporter.sendMail({
            from: '"Collaborative Journal" <collaborativejournalteamwebdev@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Password Reset", // Subject line
            text: `Hello, ${user.firstName} ${user.lastName}. Click the link to reset your password`, // plain text body
            //TODO check if this line works
            html: `<b>Click the link to reset your password:</b> <a href="http://localhost:3000/Reset">Reset Password</a>` // html body
        });

        res.send("Password reset email sent");
    } catch (e) {
        console.error("Error sending email:", e);
        console.error(`Error details: ${e.message}\nStack trace: ${e.stack}`);
        res.status(500).send(`Error sending email: ${e.message}`);
    }
});

app.post('/ResetPassword', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await userCollection.findOne({ email: email });
        if (!user) {
            return res.status(404).send("Email not found");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.send("Password updated successfully");
    } catch (e) {
        console.error("Error updating password:", e);
        console.error(`Error details: ${e.message}\n Stack trace: ${e.stack}`);
        res.status(500).send(`Error updating password: ${e.message}`);
    }
});

app.post('/CreateJournal', async (req, res) => {
    const { userId, journalName, journalKey, journalDescription } = req.body;
    try {
        const newJournal = new journalCollection({
            userId: [new mongoose.Types.ObjectId(userId)],
            name: journalName,
            key: journalKey,
            description: journalDescription
        });
        await newJournal.save();
        res.send("Journal created successfully");
    } catch (e) {
        console.error("Error creating journal:", e);
        console.error(`Error details: ${e.message}\nStack trace: ${e.stack}`);
        res.status(500).send(`Error creating journal: ${e.message}`);
    }
});

// Add this block for fetching journals
app.get('/GetJournals', async (req, res) => {
    const { userId } = req.query;
    try {
        console.log("Received request to fetch journals for userId:", userId); // Debug log
        const journals = await journalCollection.find({ userId: new mongoose.Types.ObjectId(userId) });
        console.log("Fetched journals from database:", journals); // Debug log
        res.send(journals);
    } catch (e) {
        console.error("Error fetching journals:", e); // Log the error for debugging
        console.error(`Error details: ${e.message}\nStack trace: ${e.stack}`); // Log the full error stack trace
        res.status(500).send(`Error fetching journals: ${e.message}`);
    }
});

app.post('/AddToJournal', async (req, res) => {
    const { userId, journalName, journalKey } = req.body;
    try {
        const journal = await journalCollection.findOne({ name: journalName, key: journalKey })
        if (journal) {
            if (journal.userId.includes(userId)) {
                res.send("Journal already added")
            }
            else {
                await journalCollection.updateOne(
                    { _id: journal._id },
                    { $push: { userId: userId } }
                );
                res.send("Journal added")
            }
        }
        else {
            res.send("Journal not found")
        }
    } catch (e) {
        res.send(`Error fetching journals: ${e.message}`)
    }
})


app.delete('/api/journals/:id', async (req, res) => {
    try {
        const journal = await journalCollection.findByIdAndDelete(req.params.id);
        if (!journal) {
            return res.status(404).send('Journal not found');
        }
        res.send('Journal deleted successfully');
    } catch (error) {
        console.error('Error deleting journal:', error);
        res.status(500).send('Server error');
    }
});

app.post('/Delete', async (req, res) => {
    const { journalId } = req.body;
    try {
        const journal = await journalCollection.findByIdAndDelete(journalId);
        if (!journal) {
            res.send("Journal not found");
        }
        res.send('Journal deleted successfully');
    } catch (error) {
        console.error('Error deleting journal:', error);
        res.status(500).send('Server error');
    }
})

app.put('/api/journals/:id', async (req, res) => {
    try {
        const journal = await journalCollection.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!journal) {
            return res.status(404).send('Journal not found');
        }
        res.send(journal);
    } catch (error) {
        console.error('Error updating journal:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/journals/:id', async (req, res) => {
    try {
        const journal = await journalCollection.findById(req.params.id);
        if (!journal) {
            return res.status(404).send('Journal not found');
        }
        res.send(journal);
    } catch (error) {
        console.error('Error fetching journal:', error);
        res.status(500).send('Server error');
    }
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});