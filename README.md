# google-sites-notifier
Google Sitesの更新通知メールを適当な間隔でまとめ、送信するGASです。
GAS APIが新しいSitesでも使えるようになったらお役御免……
[gas-clasp-starter](https://github.com/howdy39/gas-clasp-starter)をテンプレートとして利用。

## Tech Stack
- [google/clasp](https://github.com/google/clasp)
- [webpack](https://webpack.js.org/)
- [TypeScript](http://www.typescriptlang.org/)
- [TSLint](https://palantir.github.io/tslint/)
- [Prettier](https://prettier.io/)
- [Jest](https://facebook.github.io/jest/)

## Prerequisites
- [Node.js](https://nodejs.org/)
- [google/clasp](https://github.com/google/clasp)
- Gmailの準備
  - Google Sitesのサイトに対する変更通知をオンにする。
  - 変更通知メールのみに適用されるようなフィルタとラベルを設定する。

## Getting Started
### Clone the repository
```
git clone https://github.com/HasegawaMasahide/google-sites-notifier.git <project_name>
cd <project_name>
```

### Install dependencies
```
npm install
```

### Configuration
#### スプレッドシートの作成
Google Sitesにアクセスできるユーザでスプレッドシートを作成します。

#### 環境変数の設定
```
cp .env.sample .env
cp .clasp.json.sample .clasp.json
```

| ファイル | 変数名 | 設定値 |
| --- | --- | --- |
| .clasp.json | <your_script_id> | GASのID |
| .env | SPREAD_SHEET_ID | スプレッドシートのID |
| .env | EMAIL_TITLE | 送信するメールのタイトル |
| .env | EMAIL_TO | 送信するメールの宛先(TO), カンマ区切りで複数入力可 |
| .env | EMAIL_CC | 送信するメールの宛先(CC), カンマ区切りで複数入力可 |
| .env | SEARCH_LABEL | Google Siteの更新通知メールに付与されるラベル名(検索対象) |


### Development and build project
```
npm run build
```

### Push
```
npm run build
npx clasp login
npx clasp push
```

### シートの初期化とトリガーの設定
- ```clasp push```後、ブラウザでスクリプトを開き「initSheets」を実行する。
- 「sendNotice」に対し、適当な時間間隔でトリガーを設定する。

## License
This software is released under the MIT License, see LICENSE.txt.
