import { createApp } from './src/app.js'

const port = Number(process.env.PORT || 5000)
const server = createApp()

server.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`)
})
