module.exports = {
  pwa: {
    name: 'VUESTAGRAM',  // 설정 할 앱이름(manifest.js, service-worker.js 설정, 빌드할 때 마다 동일하게 빌드될 수 있도록 설정가능)
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    workboxOptions: {
      exclude: [/\.map$/, /manifest\.json$/, 'index.html']
    }
  },
  outputDir: './docs',
  publicPath: '/VueStagram/'
}