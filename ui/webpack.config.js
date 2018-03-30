const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
   "mode": "development",
   "context": __dirname,
   "entry": "./index.js",
   "output": {
      "path": __dirname + "./../static/",
      "filename": "bundle.js"
   },
   plugins: [
      new BrowserSyncPlugin({
         host: 'localhost',
         port: 3001,
         proxy: "localhost:3000"
      })
   ],
   module: {
      rules: [
         {
            test: /.js?$/,
            exclude: [/node_modules/, /test/],
            loader: 'babel-loader',
            options: {
               presets: ["es2015", "react"]
            }
         },
         {
            test: /.scss$/,
            exclude: /node_modules/,
            use: ["style-loader", "css-loader", "sass-loader"]
         }
      ]
   }
};