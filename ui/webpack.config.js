module.exports = {
   "mode": "development",
   "context": __dirname,
   "entry": "./index.js",
   "output": {
      "path": __dirname + "./../static/",
      "filename": "bundle.js"
   },
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
}
;