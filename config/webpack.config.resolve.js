const path = require('path');
const paths = require('./paths');

/**
 * Determine the array of extensions that should be used to resolve modules.
 */
module.exports = {
  modules: [paths.appSrc, 'node_modules'],
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.react.js'],
  mainFields: ['browser', 'module', 'main'],
  alias: {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
    Configurations: path.resolve(__dirname, '../src/configurations/'),
    Utils: path.resolve(__dirname, '../src/utils/'),
    Styles: path.resolve(__dirname, '../src/styles/base/'),
    Components: path.resolve(__dirname, '../src/components/'),
    Container: path.resolve(__dirname, '../src/container/'),
    GlobalUtils: path.resolve(__dirname, '../src/utils/global.tsx'),
    Pages: path.resolve(__dirname, '../src/pages/'),
    assets: path.resolve(__dirname, '../src/assets/index.tsx'),
    storeFeature: path.resolve(__dirname, '../src/store/features/'),
    store: path.resolve(__dirname, '../src/store/index.tsx'),
    hooks: path.resolve(__dirname, '../src/hooks/'),
    constants: path.resolve(__dirname, '../src/constants/'),
    types: path.resolve(__dirname, '../src/types/'),
  },
  fallback: {
    crypto: false,
    http: false,
  },
};
