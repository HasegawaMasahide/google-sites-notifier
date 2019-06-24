import GmailMessage = GoogleAppsScript.Gmail.GmailMessage;
import { History } from '../model/history';
import { DateUtil } from '../date.util';

export class MailService {
  static fetchMails(since: Date): GmailMessage[] {
    const threads = GmailApp.search('label:<your_label> newer:' + DateUtil.formatDate(since));
    let messages = [];
    GmailApp.getMessagesForThreads(threads).forEach(thread =>
      thread.forEach(message => messages.push(message))
    );
    return messages;
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
