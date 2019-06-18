var path = require('path');
var webpack = require('webpack');

var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {   
    mode: "development",
    entry: {
        main: './src/index.tsx',
    },
    devtool: "source-map",
    output: {
        path: path.resolve('./compiled/'),
        publicPath: 'compiled/',
        filename: "[name].bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'compiled'),
        compress: true,
        port: 3000,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.htm' }
            ]
        }
    },
    plugins: [
        new LiveReloadPlugin()
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
