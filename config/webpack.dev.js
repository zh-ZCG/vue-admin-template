const path = require('path')
const { DefinePlugin } = require("webpack");
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const getStyleLoaders = (pre) => {
    return [
        'vue-style-loader',
        'css-loader',
        {
            //通过package.json中的browserslist来指定兼容性程度
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                }
            }
        },
        pre
    ].filter(Boolean);
}

module.exports = {
    entry: "./src/main.js",
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        // assetModuleFilename: "static/media/[hash:10][ext][query]",
    },
    mode: 'development',
    module: {
        rules: [
            //处理css
            {
                test: /\.css$/,
                use: getStyleLoaders()
            },
            {
                test: /\.less$/,
                use: getStyleLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders('sass-loader')
            },
            {
                test: /\.styl$/,
                use: getStyleLoaders('stylus-loader')
            },
            //处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024
                }
            },
            //处理其他资源
            // {
            //     test: /\.(woff2?|ttf)$/,
            //     type: "asset/resource",
            // },
            { test: /\.(woff|ttf|eot|svg)/, loader: 'file-loader?name=font/[name].[ext]' },
            //处理js
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    //处理html
    plugins: [
        new EslintWebpackPlugin({
            context: 'src',
            exclude: "node_modules",
            cache: true,
            cacheLocation: 'node_modules/.cache/.eslintcache',
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        })
    ],
    devtool: 'cheap-module-source-map',
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`
        }
    },
    resolve: {
        extensions: [".vue", ".js", ".json"],
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    devServer: {
        host: "localhost",
        port: 9528,
        open: true,
        hot: true,
        historyApiFallback: true, // 解决前端路由刷新404问题
    }
}