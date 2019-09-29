const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const settings = require('electron-settings');

let win;

const createWindow = () => {
  win = new BrowserWindow({
      width: 1024,
      height: 600,
      icon: path.join(__dirname, 'app', 'favicon.ico'),
      menu: null,
      webPreferences: {
        webSecurity: false,
        devTools: true,
        nodeIntegration: true
      },
    },
  );

  // and load the index.html of the app.
  win.loadFile('./ng-app/index.html');
  win.webContents.openDevTools();

  settings.set('version', app.getVersion());

  // win.openDevTools();

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
