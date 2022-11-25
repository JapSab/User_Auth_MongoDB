const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session')
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false}));

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/registration-form')
.then(() => console.log('Connected...'))
.catch(err => console.error('Connection failed...'));

app.use(bodyParser.json())


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
    });


const User = mongoose.model('User', userSchema);



app.get('/', (req, res) => {
    res.render('welcome.ejs')
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
});


app.post('/login', async (req, res) => {
    try{
     const user = await User.findOne({email: req.body.email});
     if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.redirect('/')
        }
     }
        
    } catch {
        console.log('error')
    }
    

   
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
});




app.listen(3000)