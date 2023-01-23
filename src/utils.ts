import { down, left, mouse, right, up, screen, Region } from '@nut-tree/nut-js'
import Jimp from 'jimp'

mouse.config.mouseSpeed = 400

export async function drawCircle(p: { x: number; y: number; radius: number }) {
  await mouse.pressButton(0)

  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    await mouse.move([
      {
        x: p.x + p.radius - Math.round(p.radius * Math.cos(i)),
        y: p.y - Math.round(p.radius * Math.sin(i))
      }
    ])
  }

  await mouse.releaseButton(0)
}

export async function drawRectangle(p: { x: number; y: number }) {
  await mouse.pressButton(0)
  await mouse.move(right(p.x))
  await mouse.move(down(p.y))
  await mouse.move(left(p.x))
  await mouse.move(up(p.y))
  await mouse.releaseButton(0)
}

export async function drawSquare(size: number) {
  await drawRectangle({ x: size, y: size })
}

export async function printScreen(p: { x: number; y: number }) {
  const region = new Region(p.x - 100, p.y - 100, 200, 200)

  const grab = await screen.grabRegion(region)
  const rgb = await grab.toBGR()

  const jimp = new Jimp({ data: rgb.data, width: rgb.width, height: rgb.height })
  const buffer = await jimp.getBufferAsync(Jimp.MIME_PNG)
  return buffer.toString('base64')
}
