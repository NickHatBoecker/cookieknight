const path = require('path')

module.exports = () => {
    const nodeEnv = process.env.NODE_ENV
    const isDev = nodeEnv === 'development'
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    return {
        mode: isDev ? 'development' : 'production',
        devtool: isDev ? '#eval-source-map' : '#source-map',
        entry: './src/js/app.js',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },

                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                }
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: "app.css"
            })
        ]
    }
}
