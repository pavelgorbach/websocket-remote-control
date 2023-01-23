import { WebSocketServer, createWebSocketStream } from 'ws'
// import { mouse } from '@nut-tree/nut-js'

import { httpServer } from './src/http_server'

httpServer.listen(8181, () => {
  console.log(`Client server listening on http://localhost:8181.`)
})

const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log(`Websocket server listening on http://localhost:8080.`)
})

wss.on('connection', (client, req) => {
  console.log(`Websocket connection opened on port:${req.socket.localPort}.`)

  const duplex = createWebSocketStream(client, { encoding: 'utf8' })

  duplex.on('data', (data) => {
    console.log('received data', data)
  })

  client.on('close', () => {
    console.log('Websocket connection closed')
  })
})

wss.on('close', () => {
  console.log('Websocket server closed')
})

process.on('SIGINT', () => {
  wss.close()

  wss.clients.forEach((client) => {
    client.close()
  })

  process.exit()
})
