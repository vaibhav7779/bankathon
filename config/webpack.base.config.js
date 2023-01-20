/**
 * COMMON WEBPACK CONFIGURATION
 */

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssNormalize = require('postcss-normalize');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const VersionFile = require('webpack-version-file');
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const PostcssPresetEnv = require('postcss-preset-env');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000', 10);

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const env = getClientEnvironment('/');

process.noDeprecation = true;

module.exports = (options = { optimization: { minimize: false } }) => ({
  stats: {
    assetsSort: '!size',
    chunksSort: '!size',
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: false,
    env: true,
    errorDetails: true,
  },
  mode: options.mode,
  // Stop compilation early in production
  bail: options.bail,
  entry: options.entry,
  output: {
    // Compile into js/build.js
    path: paths.appBuild,
    publicPath: '/',
    // futureEmitAssets: true,
    // Prevents conflicts when multiple Webpack runtimes (from different apps)
    // are used on the same page.
    // jsonpFunction: `webpackJsonp${appPackageJson.name}`,

    ...options.output,
  }, // Merge with env dependent settings
  module: {
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('ts-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: imageInlineSizeLimit,
            },
          },

          // Process application JS with Babel.
          // The preset includes JSX, Flow, TypeScript, and some ESnext features.
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve('babel-preset-react-app/webpack-overrides'),
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: true,
              compact: true,
            },
          },

          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [require.resolve('babel-preset-react-app/dependencies'), { helpers: true }],
              ],
              cacheDirectory: true,
              cacheCompression: true,

              // If an error happens in a package, it's possible to be
              // because it was compiled. Thus, we don't want the browser
              // debugger to show the original code. Instead, the code
              // being evaluated would be much more helpful.
              sourceMaps: false,
            },
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use MiniCSSExtractPlugin to extract that CSS
          // to a file, but in development "style" loader enables hot editing
          // of CSS.
          // By default we support CSS Modules with the extension .module.css
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: options.cssLoaders.concat([
              {
                loader: require.resolve('css-loader'),
                options: options.cssOptions,
              },
              {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    ident: 'postcss',
                    plugins: [
                      PostcssFlexbugsFixes(),
                      PostcssPresetEnv({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      // Adds PostCSS Normalize as the reset css with default options,
                      // so that it honors browserslist config in package.json
                      // which in turn let's users customize the target behavior as per their needs.
                      postcssNormalize(),
                    ],
                  },
                  // Necessary for external CSS imports to work
                  // https://github.com/facebook/create-react-app/issues/2677
                  sourceMap: options.cssSourceMap,
                },
              },
            ]),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: options.cssLoaders.concat([
              {
                loader: require.resolve('css-loader'),
                options: options.cssModuleOptions,
              },
              {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    ident: 'postcss',
                    plugins: [
                      PostcssFlexbugsFixes(),
                      PostcssPresetEnv({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      // Adds PostCSS Normalize as the reset css with default options,
                      // so that it honors browserslist config in package.json
                      // which in turn let's users customize the target behavior as per their needs.
                      postcssNormalize(),
                    ],
                  },
                  // Necessary for external CSS imports to work
                  // https://github.com/facebook/create-react-app/issues/2677
                  sourceMap: options.cssSourceMap,
                },
              },
            ]),
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          // Opt-in support for SASS (using .scss or .sass extensions).
          // By default we support SASS Modules with the
          // extensions .module.scss or .module.sass
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: options.cssLoaders.concat([
              {
                loader: require.resolve('css-loader'),
                options: options.sassOptions,
              },
              {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: [
                      PostcssFlexbugsFixes(),
                      PostcssPresetEnv({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      // Adds PostCSS Normalize as the reset css with default options,
                      // so that it honors browserslist config in package.json
                      // which in turn let's users customize the target behavior as per their needs.
                      postcssNormalize(),
                    ],
                  },
                  sourceMap: options.sassSourceMap,
                },
              },
              {
                loader: require.resolve('resolve-url-loader'),
                options: {
                  sourceMap: options.sassSourceMap,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true,
                },
              },
            ]),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
          {
            test: sassModuleRegex,
            use: options.cssLoaders.concat([
              {
                loader: require.resolve('css-loader'),
                options: options.sassModuleOptions,
              },
              {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: [
                      PostcssFlexbugsFixes(),
                      PostcssPresetEnv({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      // Adds PostCSS Normalize as the reset css with default options,
                      // so that it honors browserslist config in package.json
                      // which in turn let's users customize the target behavior as per their needs.
                      postcssNormalize(),
                    ],
                  },
                  sourceMap: options.sassSourceMap,
                },
              },
              {
                loader: require.resolve('resolve-url-loader'),
                options: {
                  sourceMap: options.sassSourceMap,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true,
                },
              },
            ]),
          },

          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {},
          },

          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      ...options.HtmlWebpackPluginMinifyOptions,
    }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(paths.appPath),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.NamedChunksPlugin(
    //   chunk =>
    //     chunk.name ||
    //     chunk.mapModules(m => path.basename(m.request, '.jsx')).join('_'),
    // ),
    ...options.plugins,
    new webpack.optimize.AggressiveMergingPlugin({}),
    // A webpack plugin for naming on-demand chunks generated by System.import() or import().
    // Atempts to guess the chunk name by parsing the requested filename.
    // new webpack.NamedChunksPlugin(
    //   chunk =>
    //     chunk.name ||
    //     chunk.mapModules(m => path.basename(m.request, '.jsx')).join('_')
    // ),
    // new AsyncChunkNames(),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/',
      generate: (seed, files) => {
        const manifestFiles = files.reduce((manifest, file) => {
          const newManifest = { ...manifest };
          newManifest[file.name] = file.path;
          return newManifest;
        }, seed);

        return {
          files: manifestFiles,
        };
      },
    }),

    new VersionFile({
      output: path.join(paths.appBuild, '/version.json'),
      package: paths.appPackageJson,
      template: path.join(paths.appPath, '/version.ejs'),
      data: {
        buildAt: new Date().toISOString(),
        environment: env.raw.NODE_ENV,
      },
    }),
    new LodashModuleReplacementPlugin({
      shorthands: true,
      collections: true,
    }),
  ],
  resolve: {
    modules: [paths.appSrc, 'node_modules'],
    extensions: ['.js', '.jsx', '.scss', '.react.js', '.ts', '.tsx'],
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
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  optimization: {
    minimize: options.optimization.minimize,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
            // Dropping of consoles in production mode
            drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
        // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
        parallel: true,
        // Enable file caching
        // cache: true
        // sourceMap: true
      }),
      // This is only used in production mode
      new CssMinimizerPlugin(),
    ],
    // namedModules: true,
    moduleIds: 'deterministic', // it's the vendor hash we want to fix. with local changes the vendor id won't change
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        // vendor chunk
        vendor: {
          // sync + async chunks
          chunks: 'all',
          // import file path containing node_modules
          test: /node_modules/,

          // priority
          priority: 20,
        },
        // common chunk
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    // splitChunks: {
    //     name: 'vendor',
    //     minChunks: 2
    // }
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
});
