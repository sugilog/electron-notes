import electron from "electron";

const app = electron.app,
      BrowserWindow = electron.BrowserWindow;

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow();
  mainWindow.maximize();
  mainWindow.loadURL( `file://${__dirname}/index.html` );
  // FIXME
  mainWindow.webContents.openDevTools();

  mainWindow.on( "closed", function () {
    mainWindow = null;
  });
}

app.on( "ready", createWindow );

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on( "activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
