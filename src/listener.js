const electron = require('electron')

const ipc = electron.ipcRenderer

document.getElementById('start').addEventListener('click', _ => {
    ipc.send('certs-start')
})

// ipc.on('certs', (evt) => {
//     document.getElementById('count').innerHTML = count
// })