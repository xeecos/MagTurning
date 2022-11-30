import { BrowserWindow, app, Menu } from "electron";
import path from "path";
let mainWindow;
app.commandLine.appendSwitch("enable-webassembly", "true");
app.commandLine.appendSwitch("ignore-gpu-blacklist", "true");
app.commandLine.appendSwitch("enable-gpu-rasterization", "true");
app.commandLine.appendSwitch("enable-zero-copy", "true");
app.commandLine.appendSwitch("disable-software-rasterizer", "true");
app.commandLine.appendSwitch("enable-native-gpu-memory-buffers", "true");
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: "MagTurning",
    width: 1200,
    height: 800,
    "web-preferences": {
      plugins: true,
      "web-security": false,
      nodeIntegration: true
    },
    resizable: true,
    maximizable: true
  });

  console.log(path.join($dirname, "/../"));
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${$dirname}/index.html`);
  Menu.setApplicationMenu(null);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
process.on("uncaughtException", function(err) {
  console.log(err);
});
