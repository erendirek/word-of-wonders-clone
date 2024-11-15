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
        test: /\.ts$/, // .ts dosyalarını hedefler
        use: 'ts-loader', // TypeScript için ts-loader kullanılır
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development', // Geliştirme veya prodüksiyon modu
};