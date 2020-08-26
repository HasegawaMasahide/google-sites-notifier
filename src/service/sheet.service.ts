import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import { History } from '../model/history';
import { Type } from '../model/type';

export class SheetService {
  static ss: Spreadsheet = SpreadsheetApp.openById('<your_spread_sheet_id>');

  static store(histories: History[]): void {
    const store = this.ss.getSheetByName('store');
    const config = this.ss.getSheetByName('config');

    // 既存レコードに含まれないものだけ処理
    // TODO O(N^2)は多い気がする
    const stored = store
      .getDataRange()
      .getValues()
      .slice(1)
      .map((row) => new History(row));
    const unique = histories.filter((history) => !stored.some((s) => history.isEqual(s)));

    unique.forEach((history) => {
      store.appendRow([
        history.date,
        history.author,
        history.title,
        history.url,
        Type.toString(history.type),
        history.isSent,
      ]);
    });

    // 今回実行時の最新通知の日付を保存
    if (unique.length > 0) {
      const lastMessagesDate = histories.sort(History.compare)[0].date;

      config.getRange(1, 2).setValue(lastMessagesDate);
    }
  }

  static fetch(): History[] {
    const store = this.ss.getSheetByName('store');
    let values = store.getDataRange().getValues();
    values.splice(0, 1);
    return values.map((row) => new History(row)).filter((history) => !history.isSent);
  }

  static fripSendFlag(histories: History[]): number {
    const store = this.ss.getSheetByName('store');
    let counter = 0;
    store
      .getDataRange()
      .getValues()
      .forEach((row, index) => {
        if (index === 0) return;
        if (
          histories.some(
            (history) =>
              new Date(row[0]).getTime() === history.date.getTime() &&
              row[1] === history.author &&
              row[2] === history.title
          )
        ) {
          store.getRange(index + 1, 6).setValue(true);
          counter++;
        }
      });
    return counter;
  }

  static group(histories: History[]): History[] {
    // TODO トランスパイルかませてもGAS上でSetが使えなかった
    // const titles = new Set(histories.map(history => history.title));
    let titles = [];
    histories.forEach((history) => {
      if (titles.indexOf(history.title) === -1) {
        titles.push(history.title);
      }
    });
    const sorted = histories.sort(History.compare);
    // const grouped = [...titles].map(title => sorted.find(history => history.title === title));
    const grouped = titles.map((title) => sorted.filter((history) => history.title === title)[0]); // Array.findが使えなかった

    return grouped;
  }

  static lastMessagesDate(): Date {
    const config = this.ss.getSheetByName('config');
    return new Date(config.getRange(1, 2).getValue());
  }

  static log(): number {
    // TODO write logs on 'log' sheet and return count of written rows
    return 0;
  }

  static initSheet(): void {
    this.initStore();
    this.initConfig();
  }

  static initStore(): void {
    let store = this.ss.getSheetByName('store');
    if (!store) {
      store = this.ss.insertSheet('store');
    }
    store.clear();
    store.appendRow(['Date', 'Author', 'Title', 'Url', 'Type', 'isSent']);
  }

  static initConfig(): void {
    let config = this.ss.getSheetByName('config');
    if (!config) {
      config = this.ss.insertSheet('config');
    }

    config.clear();
    config.appendRow(['LastMessagesDate', '2019/01/01']);
  }
}
