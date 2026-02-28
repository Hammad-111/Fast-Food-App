const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 1024,
        minHeight: 640,
        icon: path.join(__dirname, '../public/logo.png'),
        title: 'Fast Foodies Pizza POS',
        backgroundColor: '#0f0f12',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        show: false, // Don't show until ready-to-show
    });

    // Load the built Vite app
    const indexPath = path.join(__dirname, '../dist/index.html');
    mainWindow.loadURL(pathToFileURL(indexPath).toString());

    // Show window once fully loaded (prevents white flash)
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    // Open external links in system browser instead of Electron
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
