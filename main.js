const electron = require('electron')
const {app, BrowserWindow} = electron;
const path = require('path')


const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 1200
    });

    mainWindow.loadURL('http://127.0.0.1:3000')
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})