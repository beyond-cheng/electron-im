const electron = require('electron')
const {app, BrowserWindow} = electron;
const path = require('path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 1200
    });

    mainWindow.loadFile('./page/index.html')
}

app.whenReady().then(() => {
    createWindow();


})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})