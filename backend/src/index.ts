import { Server } from 'socket.io'
import { error } from "console";
import express from "express"
import mongoose from 'mongoose'
import router from './routes/route'
import cors from 'cors'
import http from 'http'

const PORT = 4000;
const app = express();
const server = new http.Server(app);
app.use(express.json());
app.use(cors());
const io = new Server({
  cors: {
    origin: '*',
  },
})

const MONGO_URL = 'mongodb://127.0.0.1:27017'
mongoose.connect(MONGO_URL, {
  dbName: 'ng17-message-app',
}).then(() => {
  console.log('Database connected ...')
})
.catch((error) => {
  console.log('error: ', error)
})

app.use('/', router);



//Real Time Messages
io.on('connection', (socket: any) => {


  socket.on('trigger-message', () => {
    io.emit('trigger-message')
  })
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
