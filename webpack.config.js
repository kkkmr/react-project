const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path=require('path');

module.exports={
    mode:'development',
    devtool:'source-map', // Enable source maps for easier debugging
    // inline-source-map: Generates source maps as data URLs in the bundle
    // cheap-module-eval-source-map: Generates source maps with less detail, faster build time
    entry:'./App.js', // Entry point for the application
    devServer:{
        static:{ // Serve static files from the dist directory
            directory:path.join(__dirname,'dist'), // Serve static files from the dist directory
        },
        hot:true, // Enable hot module replacement
        open:true, // Open the browser after server is started
        port:3000, // Port to run the server on
    },
    output:{   
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js'
    },
    resolve:{
        extensions:['.js','.jsx'], // Resolve both .js and .jsx files
        alias:{
            '@':path.resolve(__dirname,'src') // Alias for src directory
        }
    },
    module:{
        rules:[
            {
                test:/\.(?:js|jsx)$/, // js or jsx files
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets: ['@babel/preset-env', '@babel/preset-react'] // Transpile modern JavaScript and React JSX"
                    }
                }
            },
            {
                test:/\.css$/, // CSS files
                exclude:/node_modules/,
                use:[
                    // 'style-loader', // Injects styles into the DOM
                    MiniCssExtractPlugin.loader, // Extracts CSS into separate files
                    {
                        loader:'css-loader', // Interprets @import and url() like import/require() and will resolve them
                        options:{
                            importLoaders:1, // Number of loaders applied before css-loader
                            // This is used to configure how many loaders should be applied before css-loader
                            sourceMap:true // Enable source maps for easier debugging
                        }
                    },
                    // {
                    //     loader:'postcss-loader',
                    //     options:{
                    //         postcssOptions:{
                    //             plugins:[
                    //                 require('autoprefixer') // Adds vendor prefixes to CSS rules
                    //             ]
                    //         }
                    //     }
                    // }
                ]
            },
            {
                test:/\.(png|jpe?g|gif|svg)$/i, // Image files
                type:'asset/resource', // Use asset module to manage images
                generator:{
                    filename:'assets/images/[hash][ext][query]' // Output path for images i.e hash means unique name, ext means extension, query means query string means ?v=1.0
                }
            }
        //     {
        //         test:/\.(woff|woff2|eot|ttf|otf)$/i, // Font files
        //         type:'asset/resource', // Use asset module to manage fonts
        //         generator:{
        //             filename:'assets/fonts/[hash][ext][query]' // Output path for fonts
        //         }
        //     }
        ]
    },
    plugins:[ new HtmlWebpackPlugin({
        template:'./index.html', // Template file for HTML generation
        filename:'index.html', // Output filename
        // inject:true, // Inject all assets into the body
    }),
        new MiniCssExtractPlugin({
            filename:'[name].css', // Output path for CSS
            // chunkFilename:'[id].css' // Output path for chunked CSS
        })
    ],
}