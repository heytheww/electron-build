// Modules to control application life and create native browser window
const { app, BrowserWindow, net, Menu } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')

var fs = require("fs");
const readFile = require("util").promisify(fs.readFile);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // width: 800,
    // height: 600,
    width: 1800,
    height: 1000,
    icon: 'build/icons/favicon.png',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      // allowRunningInsecureContent: true
    },
  })
  Menu.setApplicationMenu(null)

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')

  //载入react项目
  // mainWindow.loadURL('http://localhost:8000')

  // mainWindow.loadURL(path.join('file://', __dirname, '../pEnsonHeatEvalWeb/dist/index.html'))
  mainWindow.loadURL(path.join('file://', __dirname, 'ant/index.html'))
  // mainWindow.webContents.openDevTools()

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log('main', arg) // 请求的消息

  // 使用通信方式输送字体给前端
  let filePath = path.join(__dirname, ".", "font/font.js");
  let filePath2 = path.join(__dirname, ".", "font/font2.js");
  let filePath3 = path.join(__dirname, ".", "font/font3.js");
  console.log(filePath, "filePath")

  fs.readFile(filePath, { encoding: "utf-8" }, function (err, fr) {
    //readFile回调函数
    // if (err) {
    //   console.log(err);
    // } 

    fs.readFile(filePath2, { encoding: "utf-8" }, function (err, fr2) {
      //readFile回调函数

      fs.readFile(filePath3, { encoding: "utf-8" }, function (err, fr3) {
        //readFile回调函数

        event.reply('asynchronous-reply', {
          addFont: fr,
          addFont2: fr2,
          addFont3: fr3,
        })
      })
    })
  })
})

