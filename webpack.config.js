const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/controller.js'),
        about: path.resolve(__dirname, 'src/about.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        filename: '[name][contenthash].js' ,
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'assets/resourse',
            },
            {
                test:/\.mp3$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin ({
            title: 'THE TIME TIMER + TODO',
            filename: 'index.html',
            template: 'src/pages/app.html',
            chunks: ['bundle']
        }),
        new HtmlWebpackPlugin ({
            title: 'THE TIME TIMER + TODO',
            filename: 'about.html',
            template: 'src/pages/about.html',
            chunks: ['about']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
        }  
        ),
        new FaviconsWebpackPlugin({
            logo: 'src/assets/img/tttt-icon.png',
            mode: 'webapp',
            devMode: 'webapp',
            prefix: 'assets/favicons/',
            cache: true,
            inject: htmlPlugin => {
              return true;
              return basename(htmlPlugin.options.filename) === 'pages/articles.html';
            },
            favicons: {
              background: '#fff',
              theme_color: '#333',
            },
        }),
    ],
};
