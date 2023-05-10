// 导入electron的app和BrowserWindow模块
const { app, BrowserWindow,ipcMain  } = require("electron");
// 需在当前文件内开头引入 Node.js 的 'path' 模块
const path = require("path");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload:path.join(__dirname, "preload.js")
    }
  }); // 创建一个新的窗口
  ipcMain.handle('ping', () => 'pong')
  win.loadFile("index.html"); // 加载index.html文件
   // 打开开发工具
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}); // 当electron完成初始化并准备创建浏览器窗口时调用此方法

// 关闭所有窗口时退出应用
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
