const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const appDir = path.resolve(__dirname, '../');

module.exports = {
    entry: {
        bundle: path.resolve(appDir, 'index.web'),
    },
    output: {
        filename: 'bundle.web.js',
        path: path.resolve(appDir, 'dist')
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(appDir, 'src'),
                    path.resolve(appDir, 'react-native-web'),
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: ['react-app'],
                    },
                }, ],
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(appDir, 'index.html'),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ],
    resolve: {
        extensions: ['.js', '.json', '.android.js', '.ios.js'],
        alias: {
            'react-native': path.resolve(appDir, 'react-native-web'),
        },
        modules: ['web_modules', 'node_modules'],
    },
};