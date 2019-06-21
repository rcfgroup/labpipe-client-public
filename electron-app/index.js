const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const updater = require('electron-updater');
const autoUpdater = updater.autoUpdater;
const log = require('electron-log');
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
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  console.log(app.getVersion());
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


// ========== Auto upadater ========== //
process.env.GH_TOKEN = '28029a21beb60b98b640b46edafd915abf39d41d';
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.logger = log;
autoUpdater.checkForUpdatesAndNotify();


autoUpdater.on('checking-for-update', function () {
    sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', function (info) {
    sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', function (info) {
    sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', function (err) {
    sendStatusToWindow('Error in auto-updater.');
});

autoUpdater.on('download-progress', function (progressObj) {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + parseInt(progressObj.percent) + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', function (info) {
    sendStatusToWindow('Update downloaded; will install in 1 seconds');
});

autoUpdater.on('update-downloaded', function (info) {
    setTimeout(function () {
        autoUpdater.quitAndInstall();
    }, 1000);
});

autoUpdater.checkForUpdates();

function sendStatusToWindow(message) {
    console.log(message);
}
