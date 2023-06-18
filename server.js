// server.js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({ extended: true }))


MongoClient.connect("mongodb+srv://diego:123@cluster0.ugvbjo7.mongodb.net/star-wars?retryWrites=true&w=majority", { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.listen(3000, function () {
        console.log('listening on 3000')
      })
    app.get('/', (req, res) => {
      //  res.send('Hello World')
      res.sendFile(__dirname + '/index.html')
      // Note: __dirname is the current directory you're in. Try logging it and see what you get!
      // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
    })
    app.post('/quotes', (req, res) => {
        quotesCollection
            .insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
            })
  })
  .catch(error => console.error(error))

console.log('May Node be with you')