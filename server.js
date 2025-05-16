const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WebpackConfig = require('./webpack.config.js');

const compiler = Webpack(WebpackConfig);
const devServerOptions={...WebpackConfig.devServer, open:true};
const server=new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
    try {
        await server.start();
        console.log('Webpack Dev Server is running on http://localhost:3000');
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

runServer();