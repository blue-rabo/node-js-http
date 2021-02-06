'use strict';

// httpのモジュールを読み込む
const http = require('http');

// サーバーを作成
const server = http.createServer((req, res) => {
  // リダイレクトを実行
  res.writeHead(302, {
    // ニコニコ動画にリダイレクト
    'Location': 'https://www.nicovideo.jp/'
  });
  res.end();
});

// httpが起動するポートを設定
const port = 8000;

// サーバーを起動
server.listen(port, () => {
  // ログを出力
  console.info('Listening on' + port);
});