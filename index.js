'use strict';

// httpのモジュールを読み込む
const http = require('http');
// pugのモジュールを読み込む
const pug = require('pug');

// サーバーを作成
const server = http.createServer((req, res) => {
    // ログを出力
    const now = new Date();
    console.info(`[ ${now} Requested by ${req.connection.remoteAddress}`);
    // レスポンスヘッダ
    res.writeHead(200, {
        'Content-Type' : 'text/html; charset=utf-8'
    });
    // レスポンスの内容
    switch(req.method){
        // GETメソッドの場合
        case 'GET':
            // form.pugを描画し、レスポンスに書き出す
            // urlによって描画内容を動的に変更
            if(req.url === '/enquetes/yaki-shabu'){
                res.write(pug.renderFile('./form.pug', {
                    // 埋め込みたい変数をプロパティとして持っているオブジェクトを渡す
                    path: req.url,
                    firstItem: '焼肉',
                    secondItem: 'しゃぶしゃぶ'
                }));
            }else if(req.url === '/enquetes/rice-bread'){
                res.write(pug.renderFile('./form.pug', {
                    // 埋め込みたい変数をプロパティとして持っているオブジェクトを渡す
                    path: req.url,
                    firstItem: 'ごはん',
                    secondItem: 'パン'
                }));
            }else if(req.url === '/enquetes/sushi-pizza'){
                res.write(pug.renderFile('./form.pug', {
                    // 埋め込みたい変数をプロパティとして持っているオブジェクトを渡す
                    path: req.url,
                    firstItem: '寿司',
                    secondItem: 'ピザ'
                }));
            }
            res.end();
            break;
        // POSTメソッドの場合
        case 'POST':
            res.write('POST ' + req.url);
            let rawData = '';
            // 送信された値を取得
            req.on('data', (chunk) => {
                rawData = rawData + chunk;
            }).on('end', () => {
                // rawDataをデコードする
                const decoded = decodeURIComponent(rawData);
                console.log(`[${now}] 投稿: ${decoded}`);
                // 投稿内容を表示する
                res.write(`<!DOCTYPE html><html lang="ja"><body><h1>${decoded}が投稿されました。</h1></body></html>`);
                res.end();
            });
			break;
		// DELETEメソッドの場合
		case 'DELETE':
			res.write('DELETE ' + req.url);
			break;
        default:
            break;
    }
// サーバエラーのエラーログを出力
}).on('error', (e) => {
    console.error(`[ ${new Date()} ] Server Error`, e);
// クライアントエラーのエラーログを出力
}).on('clientError', (e) => {
    console.error(`[ ${new Date()} ] client Error`, e);
});

// httpが起動するポートを設定
const port = process.env.PORT || 8000;
// サーバーを起動
server.listen(port, () => {
	// ログを出力
	console.info(`[ ${new Date()} ] Listening on ${port}`);
});
