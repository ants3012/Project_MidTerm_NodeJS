const express = require('express')
const handlebars = require('express-handlebars');
const path = require('path');
const app = express()
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

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
  })

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})