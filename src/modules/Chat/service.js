import { Server } from 'socket.io'
import http from 'http'
import app from '../../app.js'
import { validateSocketShcema } from '../../helpers/validations.js'
import { createMessage, getGroupMessages } from './db.js'
import validations from './validation.js'

const { createMessageSchema, getGroupMessagesSchema } = validations

export const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('connected')

  socket.on('join_chat', (data) => {
    socket.join(`${data} joined`)
  })

  socket.on('get_group_message', async (data) => {
    try {
      if (validateSocketShcema(getGroupMessagesSchema, data) !== 0) {
        socket.emit('cant_fetch_group_messages', data)
        //todo: send error to client
        return
      }
      const msgs = await getGroupMessages(data)
      socket.emit('group_messages', msgs)
    } catch (err) {
      socket.emit('cant_fetch_group_messages', err)
    }
  })

  socket.on('send_message', async (data) => {
    try {
      if (validateSocketShcema(createMessageSchema, data) !== 0) {
        socket.emit('message_not_sent', data)
        //todo: send error to client
        return
      }
      const msg = await createMessage(data)
      socket.emit('message_sent', msg)
      socket.to(data.chat).emit('receive_message', data)
    } catch (err) {
      socket.emit('message_not_sent', err)
    }
  })
})
