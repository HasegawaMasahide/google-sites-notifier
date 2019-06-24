import { Type } from './type';
import { DateUtil } from '../date.util';

export class History {
  date: Date;
  author: string;
  title: string;
  url: string;
  type: Type;
  isSent: boolean;

  isEqual(arg: History): boolean {
    return (
      this.date.getTime() === arg.date.getTime() &&
      this.title === arg.title &&
      this.author === arg.author
    );
  }

  toMailString(): string {
    return (
      '<li>' +
      DateUtil.formatDateTime(this.date) +
      ' ' +
      this.author +
      ' さんが <a href="' +
      this.url +
      '">' +
      this.title +
      '</a> を' +
      Type.toString(this.type) +
      'しました。</li>'
    );
  }

  static compare(h1: History, h2: History): number {
    if (h1.date > h2.date) {
      return 1;
    } else if (h1.date < h2.date) {
      return 2;
    }
    return 0;
  }

  constructor(row: any[]) {
    this.date = new Date(row[0]);
    this.author = row[1];
    this.title = row[2];
    this.url = row[3];
    this.type = Type.toType(row[4]);
    this.isSent = String(row[5]).toUpperCase() === 'TRUE';
  }
}
