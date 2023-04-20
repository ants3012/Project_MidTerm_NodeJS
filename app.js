const express = require('express')
const handlebars = require('express-handlebars');
const path = require('path');
const app = express()

const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

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

io.on('connection', (socket) => {
  io.emit('chat message', socket.id+' has logged in');
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    console.log(msg);
  });
  socket.on('disconnect', () =>{
    io.emit('chat message', socket.id+' disconnected');
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