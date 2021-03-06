// パッケージのインポート
const https = require('https');
const express = require('express');
const app = express();

// 環境変数の設定
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.LINE_ACCESS_TOKEN;

// ミドルウェアの設定
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// アプリケーションの定数
const BOT_VERSION = 'ver0.1';

// GET: ヘルスチェック用
app.get('/', (req, res) => {
  res.sendStatus(200);
});

// GET: ヘルスチェック兼バージョン確認用
app.get('/version', (req, res) => {
  res.send(`${BOT_VERSION}`);
});

//POST: /webhook
app.post('/webhook', function (req, res) {
  res.send('HTTP POST request sent to the webhook URL');

  // ユーザーがボットにメッセージを送った場合、返信メッセージを送る
  if (req.body.events[0].type === 'message') {
    // ユーザーIDを取得
    const userId = req.body.events[0].source.userId;

    // 文字列化したメッセージデータ
    const dataString = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          type: 'text',
          text: `Your UserId: ${userId}`,
        },
      ],
    });

    // リクエストヘッダー
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + TOKEN,
    };

    // リクエストに渡すオプション
    const webhookOptions = {
      hostname: 'api.line.me',
      path: '/v2/bot/message/reply',
      method: 'POST',
      headers: headers,
      body: dataString,
    };

    // リクエストの定義
    const request = https.request(webhookOptions, (res) => {
      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    // エラーをハンドル
    request.on('error', (err) => {
      console.error(err);
    });

    // データを送信
    request.write(dataString);
    request.end();
  }
});

// リッスン
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
