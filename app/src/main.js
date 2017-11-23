import path from 'path'
import url from 'url'
import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'

const execFile = (...args) => {
  return new Promise((resolve, reject) => {
    require('child_process').execFile(...args, (error, stdout, stderr) => {
      if (error) reject(error)
      resolve({stdout, stderr})
    })
  })
}

let win
let dmidecodeInfo

const createWindow = () => {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.setMenu(null)
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

const dmidecode = async () => {
  try {
    let dmidecodePath
    switch (process.platform) {
      case 'darwin':
        dmidecodePath = './bin/dmidecode-osx'
        break
      case 'linux':
        dmidecodePath = './bin/dmidecode-linux'
        break
      case 'win32':
        dmidecodePath = './bin/dmidecode-win.exe'
        break
      default:
        throw new Error(`Error: Unsupported platform "${process.platform}"`)
    }
    const {stdout, stderr} = await execFile(dmidecodePath)
    if (stderr) {
      dmidecodeInfo = {status: 'failed', data: stderr}
    } else {
      dmidecodeInfo = {status: 'success', data: stdout}
    }
  } catch (err) {
    dmidecodeInfo = {status: 'error', data: err}
  }
}

app.on('ready', () => {
  dmidecode()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('dmidecode', (event) => {
  event.sender.send('dmidecode', dmidecodeInfo)
})
