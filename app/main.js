'use strict';

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// Module to use native dialogs.
const dialog = electron.dialog
// Module to use FileSystem.
const fs = require('fs')

const path = require('path')
const url = require('url')

const ipcMain = require('electron').ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		title: "ReliefValve",
		show: false,
		width: 800,
		height: 620,
		"minWidth": 480,
		"minHeight": 540
	})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  require('./menu/mainmenu')

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.on('ready-to-show', function() {
    mainWindow.show();
    mainWindow.focus();
  })

	// Open the DevTools.
	//  mainWindow.webContents.openDevTools()

  /* Code from or based on [pravdomil's comment]:
   * https://github.com/electron/electron/issues/1344
   * Open external URL's in the OS-default browser.
   */

  var handleRedirect = (e, url) => {
    if(url != mainWindow.webContents.getURL()) {
      e.preventDefault()
      require('electron').shell.openExternal(url)
    }
  }

  mainWindow.webContents.on('will-navigate', handleRedirect);
  mainWindow.webContents.on('new-window', handleRedirect);
}

// Make app single-instance.
var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
  return true;
});

if (shouldQuit) {
  app.quit();
  return;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on( 'help', function( event, arg ) {
  mainWindow.getWebContents().document.getElementById( "mainContainer" ).style.display = "none";
  mainWindow.getWebContents().window.document.getElementById( "helpContainer" ).style.display = "block";
});

/* Code from or based on
 * https://www.loggly.com/blog/node-js-error-handling/
 */
process.on('uncaughtException', (err) => {
    console.error('Whoops! There was an uncaught error', err);
    // do a graceful shutdown,
    // close the database connection etc.
    process.exit( 1 );
});
