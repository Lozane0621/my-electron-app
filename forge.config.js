const path = require('path');
const packageJson = require('./package.json');
const { version } = packageJson;
const iconDir = path.resolve(__dirname, 'assets', 'icons');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.resolve(__dirname, 'assets', 'icons', 'wantwant'),
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: (arch) => ({
        name: 'want-want-app',
        authors: '任罗振',
        exe: 'want-want-app.exe',
        noMsi: true,
        setupExe: `want-want-app-${version}-win32-${arch}-setup.exe`,
        setupIcon: path.resolve(iconDir, 'wantwant.ico')
      }),
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
    },
    {
      // 注意：一定要用cmd权限运行，否则会报错
      name: '@electron-forge/maker-wix',
      config: {
        language: 1033,
        manufacturer: 'Shinyinfo Technology Co., Ltd.',
        icon: path.resolve(iconDir, 'wantwant.ico')
      }
    },
    {
      name: '@electron-forge/maker-appx'
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO'
      }
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Lozane0621',
          name: 'my-electron-app',
        },
        prerelease: false,
        draft: false,
        authToken:'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'
      },
    },
  ],
};



