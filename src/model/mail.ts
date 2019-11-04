import { History } from './history';
export class Mail {
  date: Date;
  title: string;
  text: string;

  constructor(message: GoogleAppsScript.Gmail.GmailMessage) {
    this.date = message.getDate();
    this.title = message.getSubject();
    this.text = message.getBody();
  }

  toHistory(): History | undefined {
    if( /(を作成しました)$/.test(this.title) ||
        /(を更新しました)$/.test(this.title) ||
        /(に新しい投稿があります)$/.test(this.title)){
      
      // TODO 正規表現つかって抽出する
        const coreMessage = this.text
        .split('xhtml">')[1]
        .split('しました')[0]
        .trim();
      const author = coreMessage.replace(/ /, '').split('さん')[0];
      const title = coreMessage.split('">')[1].split('</a')[0];
      const url = coreMessage.split('href="')[1].split('">')[0];
      const type = coreMessage.match(/(作成)|(更新)|(追加)/)[0];

      // TODO コンストラクタのオーバーロードがわからないため不細工
      return new History([this.date.toString(), author, title, url, type, false]);

    }else if( /(にドキュメントを添付しました)$/.test(this.title) ||
              /(からドキュメントを削除しました)$/.test(this.title)){

      // todo メッセージ処理
      return undefined;

    }else{
      // not notice
      return undefined;
    }


    if (/(添付しました)|(削除しました)/.test(this.title)) {
    } else {
      // TODO 正規表現つかって抽出する
      const coreMessage = this.text
        .split('xhtml">')[1]
        .split('しました')[0]
        .trim();
      const author = coreMessage.replace(/ /, '').split('さん')[0];
      const title = coreMessage.split('">')[1].split('</a')[0];
      const url = coreMessage.split('href="')[1].split('">')[0];
      const type = coreMessage.match(/(作成)|(更新)|(追加)/)[0];

      // TODO コンストラクタのオーバーロードがわからないため不細工
      return new History([this.date.toString(), author, title, url, type, false]);
    }
  }
}
