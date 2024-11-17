const path = require('path');

module.exports = {
  entry: './src/main.ts', // Giriş dosyanız
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Çıktı klasörü
  },
  resolve: {
    extensions: ['.ts', '.js'], // TypeScript ve JavaScript dosyalarını çözümleme
  },
  module: {
    rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'babel-loader', // Babel ile dönüştürme
            },
            {
              loader: 'ts-loader', // TypeScript derleme
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.js$/, // Sadece .js dosyaları için Babel
          use: 'babel-loader',
          exclude: /node_modules/,
        },
    ],
  },
  mode: 'development', // Geliştirme veya prodüksiyon modu
};