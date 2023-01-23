import WebSocket, { WebSocketServer } from 'ws'
// import { mouse } from '@nut-tree/nut-js'

import { httpServer } from './src/http_server'

const PORT = 8181

httpServer.listen(PORT, () => {
  console.log(`Client server listening on port:8181.`)
})

const ws = new WebSocket(`ws:/localhost:${PORT}`)

ws.on('open', function open() {
  ws.send('message from client')
})

ws.on('message', function message(data) {
  console.log('received from server to client: %s', data)
})

const wss = new WebSocketServer({ server: httpServer })

wss.on('connection', (client) => {
  client.on('message', (data) => {
    console.log('received from client to server: %s', data)
  })

  client.send('message from server')
})

wss.on('close', () => {
  console.log('close connetion')
})
