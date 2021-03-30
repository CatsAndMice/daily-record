let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');// 版本需要在"compression-webpack-plugin": "^1.1.12",否则会报变量不存在等错误
   

const path = require('path');
function isProd() {
    return process.env.NODE_ENV === 'production';
}
module.exports = {
    configureWebpack: {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name][hash].js',
            chunkFilename: 'js/[name][hash].js'
        },

        //外部扩展
//         externals: {
//             "myvue": "Vue",
//         },

        //gizp
        plugins: isProd &&[
            new CompressionWebpackPlugin({
                filename: "[path][base].gz",
                test: /\.(js|css)(\?.*)?$/i,//需要压缩的文件正则
                threshold: 10240,//文件大小大于这个值时启用压缩
                deleteOriginalAssets: false,//压缩后是否删除原文件
                algorithm: "gzip",
            })
        ],
        //生产环境下去除console
        optimization: isProd && {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            pure_funcs: ['console.log', 'console.debug']//移除console
                        }
                    }
                })
            ],
            //分包
            splitChunks: isProd && {
                chunks: 'all',
                minSize: 50000,
                maxSize: 300000,
                minChunks: 1,
                maxAsyncRequests: 10,
                maxInitialRequests: 10,
                automaticNameDelimiter: '~',
            }
        },
    },
}

