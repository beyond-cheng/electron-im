const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld('NativeAPI', {
    info: {
        name: 'ldd',
        avator: '../public/logo512.png'
    },
    loginSucc: (token) => {
        ipcRenderer.send('loginsucc', token);
    },
    logout: () => {
        ipcRenderer.send('logout')
    }
})