import { History } from './history';
export class Mail {
  date: Date;
  text: string;

  constructor(message: GoogleAppsScript.Gmail.GmailMessage) {
    this.date = message.getDate();
    this.text = message.getBody();
  }

  toHistory(): History {
    // TODO 正規表現つかって抽出する
    const coreMessage = this.text
      .split('xhtml">')[1]
      .split('下記の')[0]
      .trim();
    const author = coreMessage.replace(/ /, '').split('さん')[0];
    const title = coreMessage.split('">')[1].split('</a')[0];
    const url = coreMessage.split('href="')[1].split('">')[0];
    const type = coreMessage.match(/(作成)|(更新)/)[0];

    // TODO コンストラクタのオーバーロードがわからないため不細工
    return new History([this.date.toString(), author, title, url, type, false]);
  }
}
