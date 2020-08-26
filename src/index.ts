import { SheetService } from './service/sheet.service';
import { MailService } from './service/mail.service';

import { Mail } from './model/mail';

declare var global: any;

global.fetchHistories = (): void => {
  const lastMessagesDate = SheetService.lastMessagesDate();
  const messages = MailService.fetchMails(lastMessagesDate);

  const histories = messages
    .map((message) => new Mail(message))
    .map((mail) => mail.toHistory())
    .filter((history) => history !== undefined);

  SheetService.store(histories);
};

global.sendNotice = (): void => {
  global.fetchHistories();

  // fetch histories from store
  const histories = SheetService.fetch();
  if (histories.length > 0) {
    const grouped = SheetService.group(histories);

    // send mail
    MailService.send(grouped);

    // change flags
    SheetService.fripSendFlag(histories);
  }
};

global.initSheets = (): void => {
  SheetService.initSheet();
};
