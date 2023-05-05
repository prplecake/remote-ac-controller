const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {DefinePlugin} = require('webpack')

const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString().trim();
const commitBranch = require('child_process')
  .execSync('git branch --show-current')
  .toString().trim();
// const commitTag = require('child_process')
//   .execSync('git describe --tags --abbrev=0')
//   .toString().trim();

const repoUrl = 'https://github.com/prplecake/remote-ac-controller';

module.exports = {
  entry: {
    frontend: './frontend/src/index.js',
  },
  output: {
    path: path.resolve('./frontend/static/frontend/'),
    filename: '[name]-[hash].js',
    publicPath: 'static/frontend/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleTracker({
      path: __dirname,
      filename: './webpack-stats.json',
    }),
    new DefinePlugin({
      'COMMIT_HASH': JSON.stringify(commitHash),
      'COMMIT_BRANCH': JSON.stringify(commitBranch),
      // 'COMMIT_TAG': JSON.stringify(commitTag),
      'REPO_URL': JSON.stringify(repoUrl)
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}