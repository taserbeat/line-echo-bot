# line-echo-bot

LINE の bot を作るためのチュートリアルを触ってみる。  
[チュートリアル）Node.js を使ってサンプル応答ボットを作る](https://developers.line.biz/ja/docs/messaging-api/nodejs-sample/#what-you-will-need)を参考。

# ボットの作成手順

1. [LINE のコンソール画面](https://developers.line.biz/console/)からプロバイダーとチャネルを作る

2. ボットサーバーを作成し、Heroku などのホスティングサービスにデプロイする

   - アクセストークンの取得

   - 環境変数(特に、アクセストークンの文字列)の設定

     ```bash
     heroku config:set SAMPLE_ENVIRONMENT_KEY=sample-value
     ```

   - webhook の設定

     - webhook エンドポイントの設定
     - `webhookの利用`を有効にする
     - `応答メッセージ`と`あいさつメッセージ`を無効にする

3. LINE で bot と友達になる

   QR コードを読み込むことで友達になれる

4. bot にメッセージを送ると、webhook エンドポイントが呼び出される

# 参考文献

- [(チュートリアル）Node.js を使ってサンプル応答ボットを作る](https://developers.line.biz/ja/docs/messaging-api/nodejs-sample/)
- [LINE Messaging API SDK for nodejs](https://line.github.io/line-bot-sdk-nodejs/#line-messaging-api-sdk-for-nodejs)
