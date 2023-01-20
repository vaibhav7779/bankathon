const path = require('path')
const fs = require('fs')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx'
]

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(givenExtension =>
    fs.existsSync(resolveFn(`${filePath}.${givenExtension}`))
  )

  if (extension) {
    return resolveFn(`${filePath}.${extension}`)
  }

  return resolveFn(`${filePath}.js`)
}

// config after eject: we're in ./config/
module.exports = {
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appBuild: resolveApp('build'),
  appHtml: resolveApp('index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPath: resolveApp('.'),
  appNodeModules: resolveApp('node_modules'),
  appPolyfillJs: resolveModule(resolveApp, 'src/polyfills')
}

module.exports.moduleFileExtensions = moduleFileExtensions
