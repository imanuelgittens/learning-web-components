const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const SRC = path.join(__dirname, 'src/');
const NODE_MODULES = path.join(__dirname, 'node_modules/');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});
 
module.exports = {
    entry: './src',               // entry point
    output: {                     // output folder
        path: __dirname + '/dist',           // folder path
        filename: 'app.js'     // file name
    },
    resolve: {
        modules: [SRC, NODE_MODULES, path.join(SRC, 'modules')]
    },
    devtool: "source-map", // any "source-map"-like devtool is possible
    module: {
         rules: [
         /*{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        },*/
        {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin()
    ]
};

/*{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        },*/