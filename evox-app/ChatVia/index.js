const { app, BrowserWindow, Menu, Tray, ipcMain, shell, Notification, screen, dialog} = require('electron');
const os = require('os');
const windowsShortcuts = require('windows-shortcuts');
const {download} = require("electron-dl");
const TITLEBAR_HEIGHT = 50; // px

const path = require('path');
const ejse = require('ejs-electron')
const fs = require('fs')
const { exec } = require('child_process')
const DiscordRPC = require('discord-rpc');
const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  //dialog.showErrorBox('Error', 'Another instance of the app is already running.');
  app.quit();
} else {
  app.on('second-instance', () => {
    // Handle the second instance attempting to run here
  });

  // The rest of your app's code here
}

function createShortcut(param) { //chatvia, shop, core, xyz
  let comment;
  let appname;
  let appicon;
  if(param == "chatvia") {
    appicon = "images\\icon-chatvia.ico"
    appname = "ChatVia"
    comment = "Ένας νέος τρόπος να μιλάτε με τους φίλους σας!"
  } else if(param == "shop") {
    appicon = "internal\\new-order.ico"
    appname = "Shopping"
    comment = "Ready To Make An Order?"
  } else if(param == "core") {
    appicon = "internal\\21c.ico"
    appname = "TwentyoneCore"
    comment = ""
  } else if(param == "xyz") {
    appicon = "internal\\hackerxlogo.ico"
    appname = "HackerX App"
    comment = "Το Αυθεντικό HackerX Site"
  } else {
    return;
  }
  let desktopPath;
if (process.platform === 'win32') {
  desktopPath = path.join(process.env.USERPROFILE, 'Desktop');
} else {
  desktopPath = path.join(os.homedir(), 'Desktop');
}
console.log('Desktop path:', desktopPath); //C:\Users\grego\Desktop
default_shortcut = `${desktopPath}\\Evox.lnk`      //THIS IS SEARCHING FOR THE DEFAULT SHORTCUT MADE BY SQUIRREL DURING INSTALLATION
//const fixedPath = default_shortcut.replace(/\\/g, '\\');
console.log(default_shortcut)
windowsShortcuts.query(default_shortcut, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Shortcut target:', data.target);
  const shortcutPath = `${desktopPath}\\${appname}.lnk`
const targetPath = data.target
const args = param; // Command-line arguments to pass to the target
windowsShortcuts.create(
  shortcutPath,
  {
    target: targetPath,
    args: args,
    icon: __dirname + `\\${appicon}`,
    description: comment
  },
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Shortcut created successfully!');
  }
);
windowsShortcuts.create(
  `${desktopPath}\\Evox.lnk`,
  {
    target: targetPath,
    icon: __dirname + `\\images\\icon.ico`,
    description: "Evox Dashboard"
  },
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Evox Default Shortcut created successfully!');
  }
);
});
}


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
let secondWindow;
//let tray = null

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    fullscreen: false,
    width: 864,
    height: 470,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    resizable: false,
    icon: __dirname + '\\images\\icon.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
    
    //transparent: true,
    //roundedCorners: true
    //webPreferences: {
    //  
    //}
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'dashboard.html'));

  //mainWindow.maximize();

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  mainWindow.webContents.on('will-download', (event, downloadItem, webContents) => {
    downloadItem.setSaveDialogOptions({
      defaultPath: path.join(app.getPath('downloads'), downloadItem.getFilename())
    })
    downloadItem.once('done', (event, state) => {
      if (state === 'completed') {
        const exePath = downloadItem.getSavePath()
        fs.access(exePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error(err)
          } else {
            exec(`"${exePath}"`, (err, stdout, stderr) => {
              if (err) {
                console.error(err)
              } else {
                console.log(`File opened: ${exePath}`)
              }
            })
          }
        })
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })


  ipcMain.on("open-file", (event, param) => {
    if(param == "1") {
      createSecondWindow()
    } else if(param == "2") {
      createWindowShop()
    } else if(param == "3") {
      createWindowCore()
    } else if(param == "4") {
      createWindowXYZ()
    } else if(param == "5") {
      createWindowDash()
    }
  });


  ipcMain.on("download", (event, url) => {
    download(url, {
      // Options object for electron-dl
      options:{directory:'C://Users//grego//Downloads'}
    })
  });

  ipcMain.on("shortcut", (event, param) => {
    createShortcut(param)
  });
  
  ipcMain.on('notification', (event, usr, message) => {
    if (secondWindow.isDestroyed()) {
      // The mainWindow object has been destroyed
    } else {
      if(usr == "Διακομιστης") {
        if (!secondWindow.isVisible() && !secondWindow.isFocused()) {
          const str = message;
          const cleanStr = str
          .replace('Καλωσορισατε', 'Ο Χρήστης')
          .replace(/<\/?b>/g, '')
          .replace("!", '')
          .replace(",", '')
          .concat(' συνδέθηκε!');
          new Notification({
            title: "Ειδοποιηση Διακομιστη",
            body: cleanStr,
            icon: path.join(__dirname, './icons/favicon.ico'),
            appname: 'ChatVia'
          }).show();
        }
      } else {
        if (!secondWindow.isVisible() && !secondWindow.isFocused()) {
        new Notification({
          title: usr,
          body: message,
          icon: path.join(__dirname, './icons/favicon.ico'),
          appname: 'ChatVia'
        }).show();
      }
      }
    }
    
    
  })



};



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
//app.on('window-all-closed', () => {
//  if (process.platform !== 'darwin') {
//    app.quit();
//  }
//});

const createSecondWindow = () => {
  // Create the browser window.
  secondWindow = new BrowserWindow({
    fullscreen: false,
    width: 1288,
    height: 725,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    icon: __dirname + '\\internal\\logo.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
    
    //transparent: true,
    //roundedCorners: true
    //webPreferences: {
    //  
    //}
  });
  
  secondWindow.maximize();
  // and load the index.html of the app.
  secondWindow.loadFile(path.join(__dirname, 'index.html'));
  chatviatray = new Tray(path.join(__dirname, '\\internal\\logo.ico'));

  chatviatray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        if (secondWindow.isDestroyed()) {
          createSecondWindow()
        } else {
          secondWindow.show();
        }
        
      }
    },
    {
      label: 'Quit', click: function () {
        isQuiting = true;
        app.quit();
      }
    }
  ]));
}
let chatviatray;
const createWindowShop = () => { //SHOP
  // Create the browser window.
  secondWindow = new BrowserWindow({
    fullscreen: true,
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    icon: __dirname + '\\internal\\new-order.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
    
    //transparent: true,
    //roundedCorners: true
    //webPreferences: {
    //  
    //}
  });
  secondWindow.maximize();
  // and load the index.html of the app.
  secondWindow.loadFile(path.join(__dirname, '/shop/index.html'));
}

const createWindowCore = () => { //TWENTYONECORE
  // Create the browser window.
  secondWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    icon: __dirname + '\\internal\\21c.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      enableRemoteModule: true
    }
    
    //transparent: true,
    //roundedCorners: true
    //webPreferences: {
    //  
    //}
  });
  secondWindow.maximize();
  // and load the index.html of the app.
  secondWindow.loadFile(path.join(__dirname, '/core/index.html'));
}

const createWindowXYZ = () => { //XYZ
  // Create the browser window.
  secondWindow = new BrowserWindow({
    fullscreen: false,
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    icon: __dirname + '\\internal\\hackerxlogo.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
    
    //transparent: true,
    //roundedCorners: true
    //webPreferences: {
    //  
    //}
  });
  secondWindow.maximize();
  // and load the index.html of the app.
  secondWindow.loadFile(path.join(__dirname, '/hackerx.xyz/index.html'));
}

const createWindowDash = () => {
  // Create the browser window.
  fifthWindow = new BrowserWindow({
    fullscreen: false,
    width: 864,
    height: 470,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    resizable: false,
    icon: __dirname + '/images/icon.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
    //transparent: true,
    //roundedCorners: true
    //webPreferences: {
    //  
    //}
  });
  const encodedPath = path.join(__dirname, '/dashboard.html?stay=true')
  console.log(encodedPath)
  fifthWindow.webContents.loadURL(`file://${encodedPath}`);

  // and load the index.html of the app.
  //fifthWindow.loadFile(path.join(__dirname, '/dashboard.html?stay=true'));
}


app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();

  }
});

let tray;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const param = process.argv[1];
  if (param == "chatvia") {
    createSecondWindow()
  } else if(param == "shop") {
    createWindowShop()
  } else if(param == "core") {
    createWindowCore()
  } else if(param == "xyz"){
    createWindowXYZ()
  } else {
    createWindow()
  }

 
  tray = new Tray(path.join(__dirname, '\\images\\icon.ico'));

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        if (mainWindow.isDestroyed()) {
          createWindow()
        } else {
          mainWindow.show();
        }
        
      }
    },
    {
      label: 'Quit', click: function () {
        isQuiting = true;
        app.quit();
      }
    }
  ]));
  //createSecondWindow()
  

  //mainWindow.webContents.on('did-fail-load', () => {
  //    mainWindow.loadFile('./src/404/index.html');
  //  })
});

app.on('before-quit', () => {
  rpc.destroy();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('download-file', (event) => {
  const downloadsFolder = path.join(os.homedir(), 'Downloads'); //Downloads Folder
})

ipcMain.on('minimize', (event) => {
  BrowserWindow.getFocusedWindow().hide();
})

// Set this to your Client ID.
const clientId = '1092136606837768233';

// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !mainWindow) {
    return;
  }

  // You'll need to have snek_large and snek_small assets uploaded to
  // https://discord.com/developers/applications/<application_id>/rich-presence/assets
  rpc.setActivity({
    //details: `booped ${boops} times`,
    //state: 'in slither party',
    startTimestamp,
    largeImageKey: 'logo',
    largeImageText: 'Evox ChatVia',
    //smallImageKey: 'snek_small',
    //smallImageText: 'i am my own pillows',
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);