// 导入electron的app和BrowserWindow模块
const { app, BrowserWindow,ipcMain,Menu  } = require("electron");


// 需在当前文件内开头引入 Node.js 的 'path' 模块
const path = require("path");
const createWindow = () => {
  Menu.setApplicationMenu(null)
  const win = new BrowserWindow({
    show:false,
    backgroundColor: '#1d2427',
    width: 1200,
    height: 800,
    minWidth: 600,
    minHeight: 300,
    center:true,
    title:'旺旺集团一站式服务平台',
    icon:path.join(__dirname,'./icon.ico'),
    titleBarStyle: 'hiddenInset',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 60
    },
    darkTheme:true,
    hasShadow:true,
    roundedCorners:true,
    webPreferences: {
      preload:path.join(__dirname, "preload.js"),
      nodeIntegration:true,
      contextIsolation: false,
    }
  }); // 创建一个新的窗口
  win.once('ready-to-show', () => {
    win.show()
  })
  ipcMain.handle('ping', () => 'pong')
  win.loadFile("index.html"); // 加载index.html文件
  // win.loadURL('http://app.shinyinfo.com.cn:31888/')
  // win.loadURL('https://www.baidu.com/')
   // 打开开发工具
  // win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  setupUpdates();
}); // 当electron完成初始化并准备创建浏览器窗口时调用此方法

// 关闭所有窗口时退出应用
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


// 开机自启
app.setLoginItemSettings({
  openAtLogin: true,
  openAsHidden:true
})


function setupUpdates() {
  // We delay this work by 10s to ensure that the
  // app doesn't have to worry about updating during launch
  setTimeout(() => {
    const updateApp = require('update-electron-app');

    updateApp({
      updateInterval: '1 hour',
    });
  }, 10000);
}


if(require('electron-squirrel-startup')) return;

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}



function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};


