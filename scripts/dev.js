import { spawn } from 'node:child_process'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const applications = [
  ['USER', ['run', 'dev:user']],
  ['ADMIN', ['run', 'dev:admin']],
  ['BACKEND', ['run', 'dev:backend']],
]

const children = applications.map(([name, arguments_]) => {
  const child = spawn(npmCommand, arguments_, {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  child.on('exit', (code) => {
    if (code && code !== 0) console.error(`${name} exited with code ${code}`)
  })

  return child
})

function shutdown() {
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM')
  }
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
