const express = require('express')
const Dbconnect = require('./db/db.js')
const app = express()
const port = 3000
const tasks = require('./public/routes/routers.js')
app.use(express.json())
require('dotenv').config()

app.use(express.static('./public/all static files'))

app.use('/api/v1/tasks', tasks)

const start = async () => {
  try {
    await Dbconnect(process.env.MONGO_URL)
    app.listen(port, console.log(`Server listning on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
