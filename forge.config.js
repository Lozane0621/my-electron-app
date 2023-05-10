module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
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
