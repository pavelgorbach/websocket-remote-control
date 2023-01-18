# Websocket Remote Control

## Running
### Client app
1. Clone repo `git clone https://github.com/rolling-scopes-school/remote-control`
2. Go to the app root `cd remote-control`
3. Install dependencies `npm install`
4. Run `npm run start` 

### Server app
1. Clone repo `https://github.com/pavelgorbach/websocket-remote-control.git`
2. Go to the app root `cd websocket-remote-control`
3. Checkout to `dev` branch `git checkout dev`
4. Install dependencies `npm install`
5. Run `npm run start`

## Usage
All commands should be executed on the client side(in browser)
### Mouse control
You can send messages to the ws server with the help of the keyboard arrow buttons

### Drawing
You can draw circle (keyboard `c` button), square (keyboard `s` button) and rectangular (keyboard "r" button)

### Screenshot
You can get part of screen image
with `LCtrl+p` keyboard buttons

### Change websocket URL
You can change URL using client app interface(in WebSocket section)