import express from 'express';
import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
const _dirname = dirname(fileURLToPath(import.meta.url));

const con = mongoose.connect('mongodb+srv://piyush9131:piyush9131@cluster0.mfmd7gv.mongodb.net/todolistDb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


//Add Task
const itemSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model('Task', itemSchema)


app.get('/', async (req, res) => {
  const data = await Item.find({})

  res.render(_dirname + '/views/index.ejs', {
    items: data
  })
})


app.post('/addTask', (req, res) => {

  const task = new Item({
    name: req.body.newItem
  })
  task.save();
  res.redirect('/')
})


app.post('/deleteTask', async (req, res) => {

  const o = await Item.deleteOne({ _id: req.body.id })

  res.redirect('/')
})

app.listen(3000, (req, res) => {
  console.log('i am running on port 3000')
})