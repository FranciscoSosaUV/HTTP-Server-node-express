//Express declarations
const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const exphbs = require('express-handlebars')
//DB declarations
const { Client } = require('pg')
//db conection - credentials
const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'node_hero',
  password: '123456',
  port: 5432,
}
const client = new Client(connectionData)
//Express
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
  console.log('conectando base de datos')
  client.connect()
})

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (request, response) => {
    response.render('home', {
      name: 'Francisco'
    })
  })

//POST mehod
app.post('/users', function (req, res, next) {
  const user = req.body

  
    client.query('INSERT INTO users (name, age) VALUES ("Raul", 10);', [user.name, user.age], function (err, result) {
      
      if (err) {
        // pass the error to the express error handler
        return next(err)
      }
      console.log(result)
      console.log("despues de mi ")
      res.send(200)
    })
  })

//GET method
app.get('/users', function (req, res, next) {
  
    client.query('SELECT name, age FROM users;', [], function (err, result) {
        if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.json(result.rows)
    })
  })



client.query('SELECT * FROM users')
    .then(response => {
        console.log(response.rows)
        
    })
    .catch(err => {
        client.end()
    })
/*
const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const exphbs = require('express-handlebars')


//Express
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (request, response) => {
    response.render('home', {
      name: 'John'
    })
  })
  */