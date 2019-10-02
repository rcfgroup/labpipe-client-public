const {app, BrowserWindow} = require('electron');
const url = require('url');
const settings = require('electron-settings');

let win;

const createWindow = () => {
  setTimeout(() => {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true
      }
    });

    win.loadURL(url.format({
      pathname: 'localhost:4200',
      protocol: 'http',
      slashes: true
    }));
    settings.delete('running_operator');
    settings.delete('running_operator_password');

    win.on('closed', () => {
      win = null
    });

  }, 10000);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  settings.delete('running_operator');
  settings.delete('running_operator_password');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
