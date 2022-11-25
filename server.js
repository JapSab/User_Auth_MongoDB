const express = require('express');
const app = express();
const bcrypt = require('bcrypt');


app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/registration-form')
.then(() => console.log('Connected...'))
.catch(err => console.error('Connection failed...'));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
    });


const User = mongoose.model('User', userSchema);

// const users = []


app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
});


app.post('/login', (req, res) => {

});


app.get('/register', (req, res) => {
    res.render('register.ejs')
});

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
            async function createUser() {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword

                });

                

            const result = await user.save();

            }

            createUser();
            res.redirect('/login')

    }catch {
        
        res.redirect('/register')
    }
    // console.log(users);
});




app.listen(3000)