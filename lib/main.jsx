import electron from "electron";

const app           = electron.app,
      BrowserWindow = electron.BrowserWindow;

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow();
  mainWindow.maximize();
  mainWindow.loadURL( `file://${__dirname}/index.html` );
  // mainWindow.webContents.openDevTools();

  mainWindow.on( "closed", () => {
    mainWindow = null;
  });
}

app.on( "ready", createWindow );

app.on( "window-all-closed", () => {
  if ( process.platform !== "darwin" ) {
    app.quit();
  }
});

app.on( "activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if ( mainWindow === null ) {
    createWindow()
  }
})
