import { WebSocketServer, createWebSocketStream } from 'ws'
import { mouse } from '@nut-tree/nut-js'

import { httpServer } from './src/http_server'
import { drawCircle, drawRectangle, drawSquare } from './src/utils'

httpServer.listen(8181, () => {
  console.log(`Client server listening on http://localhost:8181.`)
})

const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log(`Websocket server listening on http://localhost:8080.`)
})

wss.on('connection', (client, req) => {
  console.log(`Websocket connection opened on port:${req.socket.localPort}.`)

  const duplex = createWebSocketStream(client, { encoding: 'utf8', decodeStrings: false })

  duplex.on('data', async (data) => {
    const [name, arg1, arg2] = data.split(' ')

    duplex.write(`${name} ${arg1} ${arg2}`)

    const { x, y } = await mouse.getPosition()

    if (name === 'mouse_up') {
      await mouse.setPosition({ x, y: y - arg1 })
    } else if (name === 'mouse_right') {
      await mouse.setPosition({ x: x - -arg1, y })
    } else if (name === 'mouse_down') {
      await mouse.setPosition({ x, y: y - -arg1 })
    } else if (name === 'mouse_left') {
      await mouse.setPosition({ x: x - arg1, y })
    } else if (name === 'draw_circle') {
      await drawCircle({ x: Number(x), y: Number(y), radius: Number(arg1) })
    } else if (name === 'draw_square') {
      await drawSquare(Number(arg1))
    } else if (name === 'draw_rectangle') {
      await drawRectangle({ x: Number(arg1), y: Number(arg2) })
    }
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
