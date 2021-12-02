const {app, BrowserWindow, globalShortcut, Tray, nativeImage} = require('electron')
const path = require('path')

// import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 1200,
        // frame: false,
        // titleBarStyle: 'hidden',
        // titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        },
        webPreferences: {
            preload: path.resolve(__dirname, 'src/preload.js')
        }
    });

    // mainWindow.loadFile(path.resolve(__dirname, './build/index.html'))
    mainWindow.loadURL('http://127.0.0.1:3000/')

    globalShortcut.register('Shift+CommandOrControl+I', () => {
        mainWindow.webContents.openDevTools();
    })
}


app.whenReady().then(() => {
    
    const icon = nativeImage.createFromPath('public/logo_32.png')
    tray = new Tray(icon)

}).then(createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})