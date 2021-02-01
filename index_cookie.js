'use strict'

// httpのモジュールを読み込む
const http = require('http');
// サーバーを作成
const server = http.createServer((req, res) => {
  // 現在時間を取得
  const now = Date.now();
  // Cookieに情報を設定
  res.setHeader('Set-Cookie', `last_access=${now};`);
  // レクエスト情報をヘッダーのcookieから最終アクセス時刻を取得
  const last_access_time = req.headers.cookie ? parseInt(req.headers.cookie.split('last_access=')[1]) : now;
  // 最終アクセス時刻を文字列に変換したものを出力
  res.end(new Date(last_access_time).toString());
});
// httpが起動するポートを設定
const port = 8000;

// サーバーを起動
server.listen(port, () => {
  // ログを出力
  console.info('Listening on' + port);
});