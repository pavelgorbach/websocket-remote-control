import { down, left, mouse, right, up } from '@nut-tree/nut-js'

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
