/* eslint-disable no-unused-vars */
import { Server } from 'socket.io'
import http from 'http'
import app from '../../app.js'
import { validateSocketShcema } from '../../helpers/validations.js'
import { createMessage, getGroupMessages } from './db.js'
import validations from './validation.js'
import { badRequestErrorCreator } from '../../helpers/errors.js'
import { responseDataCreator } from '../../helpers/common.js'
import { checkUserInGroup } from './db.js'
import { ROLE_ADMIN } from '../constants.js'
import { updateUserIsOnline } from '../Users/db.js'

const { createMessageSchema } = validations

export const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  let userId
  socket.on('login', async (data) => {
    userId = data.id
  })

  socket.on('join_chat', async (data) => {
    try {
      socket.join(`groupId:${data.groupId}`)
      socket.emit('join_status', 'Joined group successfully')
    } catch (err) {
      console.log(err)
    }
  })

  socket.on('send_message', async (data) => {
    try {
      const valid = await validateSocketShcema(createMessageSchema, data)
      if (valid !== 0) {
        socket.emit('message_not_sent', data)
        return
      }
      const msg = await createMessage(data)
      socket.emit('message_sent', msg)
      socket.broadcast.to(`groupId:${data.groupId}`).emit('receive_message', msg)
    } catch (err) {
      socket.emit('message_not_sent', err)
    }
  })

  socket.on('disconnect', async () => {
    await updateUserIsOnline(userId, false)
  })
})

export const handleGetGroupMessages = async (req, res) => {
  const { groupId } = req.params
  let { take, skip } = req.query
  skip = +skip || 0
  take = +take || take
  try {
    if (req.role.name !== ROLE_ADMIN) {
      const user = await checkUserInGroup(req.id, +groupId)
      if (!user) {
        res.status(406).json(badRequestErrorCreator('User is not in group'))
        return
      }
    }
    let groupMsgs = await getGroupMessages(+groupId, take, skip, req.id)
    groupMsgs = groupMsgs.map((msg) => {
      const isSender = msg.sender?.id === req.id
      return { data: msg, user: isSender }
    })
    res.status(200).json(responseDataCreator(groupMsgs))
  } catch (err) {
    console.log(err)
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}
