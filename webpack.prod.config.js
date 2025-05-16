const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path=require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin'); // For code minification

module.exports={
    mode:'production', // Set the mode to production for optimized builds
    entry:'./App.js',
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
    performance:{
        hints:'warning', // Show performance hints for large assets like warning, error, or false
        maxAssetSize:100000, // Maximum size for an asset to be considered small
        maxEntrypointSize:100000 // Maximum size for an entry point to be considered small
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
                    filename:'assets/images/[hash][ext][query]' // Output path for images
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
            // inject:true, // Inject all assets into the body or head
            inject:'body', // Inject all assets into the body i.e script tags will be injected into the body (recommended for performance as scripts are loaded either in parallel or after the body is loaded) 
            // inject:'head', // Inject all assets into the head (not recommended for performance as scripts are loaded in series and the body is not loaded until all scripts are loaded)
            // inject:false, // Do not inject any assets (not recommended as the HTML file will not have any script tags)
            minify:{
                removeComments:true, // Remove comments from the output
                collapseWhitespace:true, // Collapse whitespace in the output
                removeAttributeQuotes:true // Remove attribute quotes from the output
            }
        }),
        new MiniCssExtractPlugin({
            filename:'[name].css', // Output path for CSS files
            // chunkFilename:'assets/css/[id].css' // Output path for chunked CSS files
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'), // Define environment variable for production
            API_URL: JSON.stringify('https://api.example.com') // Define API URL for production and this URL can be different for different environments like development, testing, and production
            // JSON.stringify is necessary as the plugin does a direct string replacement and it must either contain quotes like '"production"' or stringify 'production' with JSON.stringify
        })
    ],
    optimization:{
        minimize:true, // Enable code minimization
        minimizer:[ // Minimize the code using TerserPlugin
            new TerserPlugin({
                terserOptions:{
                    compress:{
                        drop_console:true // Remove console logs
                    }
                }
            })
        ],
        splitChunks:{
            // chunksId:"named", // Split chunks by name
            chunks:'async', // Split chunks for async loading
            minSize:20000, // Minimum size for a chunk to be generated i.e if file or chunk size is less than 20kb, no optimization is done
            minRemainingSize:0, // Minimum remaining size for a chunk to be generated
            minChunks:1, // Minimum number of chunks that must share a module before splitting
            maxAsyncRequests:30, // Maximum number of async requests
            maxInitialRequests:30, // Maximum number of initial requests
            enforceSizeThreshold:50000, // Size threshold for chunk splitting i.e if chunk size is more than 50kb, it will be split
            cacheGroups:{ // Cache groups for chunk splitting i.e separate chunks for shared modules
                defaultVendors:{ // Default vendor cache group
                    test:/[\\/]node_modules[\\/]/, // Test for node_modules
                    name:'vendors', // Name of the cache group
                    chunks:'all', // Split all chunks
                    priority:-10, // Priority for vendor chunk splitting
                    reuseExistingChunk:true // Reuse existing chunks if possible
                },
                default:{
                    minChunks:2, // Minimum number of chunks that must share a module before splitting
                    priority:-20, // Priority for chunk splitting
                    reuseExistingChunk:true, // Reuse existing chunks if possible
                    name:'common', // Name of the cache group
                    chunks:'all' // Split all chunks
                }
            }
        }
    }
}