const { contextBridge } = require("electron")

contextBridge.exposeInMainWorld('NativeAPI', {
    info: {
        name: 'ldd',
        avator: '../public/logo512.png'
    }
})