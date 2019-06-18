import GmailMessage = GoogleAppsScript.Gmail.GmailMessage;
import { History } from '../model/history';

export class MailService {
  static fetchMails(since: Date): GmailMessage[] {
    const threads = GmailApp.search('label:<your_label> newer:' + this.formatDate(since));
    const messages = GmailApp.getMessagesForThreads(threads).map(thread => thread[0]);
    return messages;
  }

  static formatDate(arg: Date): string {
    const year = arg.getFullYear();
    const month = arg.getMonth() + 1;
    const date = arg.getDate();

    return year + '/' + (month < 10 ? '0' + month : month) + '/' + (date < 10 ? '0' + date : date);
  }

  static send(grouped: History[]): void {
    // build mail from histories
    let body = '前回通知以降、次の変更がありました。<br /><ul>';
    grouped.forEach(history => (body += history.toMailString()));
    body += '</ul>';

    const result = GmailApp.sendEmail(
      '<mailaddress>',
      '<title>',
      '',
      { htmlBody: body }
    );
  }
}
