import { Server } from 'socket.io'
import http from 'http'
import app from '../../app.js'
import { validateSocketShcema } from '../../helpers/validations.js'
import { createMessage, getGroupMessages } from './db.js'
import validations from './validation.js'
import { badRequestErrorCreator } from '../../helpers/errors.js'
import { responseDataCreator } from '../../helpers/common.js'

const { createMessageSchema } = validations

export const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('connected')

  socket.on('join_chat', async (data) => {
    try {
      console.log(`groupId:${data.groupId}`, 'join')
      socket.join(`groupId:${data.groupId}`)
      socket.emit('join_status', 'Joined group successfully')
    } catch (err) {
      console.log(err)
    }
  })

  socket.on('get_group_messages', async (data) => {
    const take = -15
    const skip = +data.skip || 0
    let groupMsgs = await getGroupMessages(data.groupId, take, skip)
    groupMsgs = groupMsgs.map((msg) => {
      const isSender = msg.sender.id === data.userId
      return { data: msg, user: isSender }
    })
    if (groupMsgs.length) socket.emit('recieve_group_messages', groupMsgs)
  })

  socket.on('send_message', async (data) => {
    try {
      const valid = await validateSocketShcema(createMessageSchema, data)
      if (valid !== 0) {
        socket.emit('message_not_sent', data)
        //todo: send error to client
        return
      }
      const msg = await createMessage(data)
      socket.emit('message_sent', msg)
      socket.broadcast.to(`groupId:${data.groupId}`).emit('receive_message', msg)
    } catch (err) {
      console.log(err)
      socket.emit('message_not_sent', err)
    }
  })
})

export const handleGetGroupMessages = async (req, res) => {
  const { groupId } = req.params
  const { take, skip } = req.query
  try {
    const msgs = await getGroupMessages(+groupId, +take, +skip)
    res.status(200).json(responseDataCreator(msgs))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}
