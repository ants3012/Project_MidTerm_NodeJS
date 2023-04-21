const express = require('express')
const handlebars = require('express-handlebars');
const path = require('path');
const app = express()

// Regiter
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./user');

// Socket.IO
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

//Connect to DB
mongoose.connect('mongodb://localhost:27017/chat_application', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Connected to MongoDB');
// });

// template engine
app.engine('hbs', handlebars.engine({
  defaultLayout : 'main',
  extname : '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home')
})

// ---------------Register-----------------

// Sử dụng body-parser middleware để parse request body
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/register', async (req, res) => {
//   // get user input
//   const { username, email, password } = req.body;

//   User.findOne({ email}, (err, user) => {
//     if(err) {
//       console.error(err);
//       return res.status(500).send('Internal server error');
//     }
//     //Check email exists
//     if (user) {
//       return res.status(400).send('Email has already been taken');
//     }

//     // create a new user
//     const newUser = new User({
//       username,
//       email,
//       password,
//     });

//     // Save user into database
//     newUser.save(err => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Internal server error');
//       }
//       return res.status(201).send('User has been created');
//     });
//   });
// });

// ---------------Chat-----------------
io.on('connection', (socket) => {
  io.emit('noty', socket.id+' has logged in');
  socket.on('chat message', (data) => {
    if(data.user==="")data.user="Guest";
    io.emit('chat message', (data));
    console.log(data.msg);
  });
  socket.on('disconnect', () =>{
    io.emit('noty', socket.id+' disconnected');
  })
});

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
  })


http.listen(port, () => {
  console.log(`App listening on port ${port}`)
})