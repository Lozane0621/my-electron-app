/**
 * Sets up the update service
 */
export function setupUpdates() {
  // We delay this work by 10s to ensure that the
  // app doesn't have to worry about updating during launch
  setTimeout(() => {
    const updateApp = require('update-electron-app');
    updateApp({
      updateInterval: '5 minutes',
    });
  }, 10000);
}