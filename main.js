const {app, BrowserWindow, globalShortcut, Tray, nativeImage, ipcMain} = require('electron')
const path = require('path')
const fsp = require('fs/promises')
const fs = require('fs')
let token;
let mainWindow

// import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const createWindow = () => {
    
    if(!token) {
        //login
        mainWindow = openLoginPage();
    } else {
        //not login
        mainWindow = openChatPage();
    }

    globalShortcut.register('Shift+CommandOrControl+I', () => {
        mainWindow.webContents.openDevTools();
    })
}


function openLoginPage() {
    const win = new BrowserWindow({
        width: 600,
        height: 500,
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

    // win.loadFile(path.resolve(__dirname, './build/login.html'))
    win.loadURL('http://127.0.0.1:3000/login.html')

    return win;
}

function openChatPage() {
    const win = new BrowserWindow({
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

    // win.loadFile(path.resolve(__dirname, './build/login.html'))
    win.loadURL('http://127.0.0.1:3000/chat.html')

    return win;
}

app.whenReady().then(() => {
    //處理右上角托盤 icon
    const icon = nativeImage.createFromPath('public/logo_32.png')
    tray = new Tray(icon)
}).then(getToken).then(createWindow)


async function getToken() {
    if(fs.existsSync('./token')) {
        let data = await fsp.readFile('./token', {encoding: 'utf8'})

        // console.log(data)
        token = data;
    }
}

async function saveToken(token) {
    await fsp.writeFile('./token', token);
}

async function clearToken(token) {
    await fsp.writeFile('./token', '');
}

ipcMain.on('loginsucc', (event, token) => {
    // console.log(token)

    saveToken(token);

    mainWindow.close();
    mainWindow = openChatPage();
})

ipcMain.on('logout', (event) => {

    clearToken();

    mainWindow.close();
    mainWindow = openLoginPage();
})



app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})