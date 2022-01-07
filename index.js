const {app, BrowserWindow, ipcMain} = require("electron")
var path = require("path");

let win;
const createWindow = () =>{
    
    var preload_path = path.resolve("./website/scripts/preload.js");
    console.log(preload_path)
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        frame: true,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            //preload: preload_path
        
        },
        title: "Facebook pokes!",
        darkTheme: true,
        autoHideMenuBar: true,
        backgroundColor: "#000",
        roundedCorners: true,
        
        
    })
    win.loadFile("./website/index.html")
}
app.on('ready', async () => {
    createWindow()
})
/*ipcMain.on("no_of_pokes", (event, args) => {
    console.log(args);
    win.webContents.send("no_of_pokes_send_channel", args);
    
});*/
