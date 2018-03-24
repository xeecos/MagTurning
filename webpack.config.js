var path = require("path");
var fs = require("fs");
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [{
        entry: {
            bundle: "./src/app.jsx"
        },
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "app.[name].js"
        },
        resolve: {
            extensions: [".js", ".jsx"]
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: "babel-loader",
                        query: {
                            presets: ["babel-preset-env"]
                        }
                    },
                    include: [path.resolve(__dirname, "src")],
                    exclude: [/node_modules/]
                },
                {
                    test: /\.node$/,
                    loader: "node-loader"
                }
            ]
        },
        target: "electron-main",
        externals: {
            serialport: "commonjs serialport"
        },
        plugins: [
            new webpack.DefinePlugin({
                $dirname: "__dirname"
            })
        ]
    },
    {
        entry: {
            bundle: "./src/web.jsx"
        },
        output: {
            path: path.resolve(__dirname, "./dist/"),
            filename: "web.[name].js"
        },
        resolve: {
            extensions: [".js", ".jsx"]
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: "babel-loader",
                        query: {
                            presets: ["babel-preset-env", "react"]
                        }
                    },
                    include: [path.resolve(__dirname, "src")],
                    exclude: [/node_modules/]
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                    include: [
                        path.resolve(__dirname, "src"),
                        path.resolve(__dirname, "./node_modules/antd")
                    ]
                },
                {
                    test: /\.(jpeg|jpg|png|gif|svg|wasm)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "wasm"
                        }
                    }
                },
                {
                    test: /\.node$/,
                    use: "node-loader"
                }
            ]
        },
        target: "node",
        plugins: [
            new webpack.DefinePlugin({
                $dirname: "__dirname"
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],
        externals: {
            serialport: "commonjs serialport"
        },
        devServer: {
            historyApiFallback: true,
            compress: true,
            contentBase: path.join(__dirname, "./dist")
        }
    }
];