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

#### スクリプトIDの設定(.clasp.json)
```
{
  "scriptId": <your_script_id>,
  "rootDir": "dist"
}
```
#### スプレッドシートIDの設定(src/service/sheet.service.ts)
```
export class SheetService {
  static ss: Spreadsheet = SpreadsheetApp.openById('<your_spread_sheet_id>');
  ...
}
```
#### メールの設定(src/service/mail.service.ts)
```
const result = GmailApp.sendEmail(
  '<mailaddress,mailaddress>',
  '<title>',
  '',
  { htmlBody: body, cc:'<mailaddress,mailaddress>' }
);
```
```
static fetchMails(since: Date): GmailMessage[] {
    const threads = GmailApp.search('label:<your_label> newer:' + this.formatDate(since));
    ...
  }
```

### Development and build project
```
npm run build
```

### Push
```
clasp push
```

### シートの初期化とトリガーの設定
- ```clasp push```後、ブラウザでスクリプトを開き「initSheets」を実行する。
- 「sendNotice」に対し、適当な時間間隔でトリガーを設定する。

## License
This software is released under the MIT License, see LICENSE.txt.
