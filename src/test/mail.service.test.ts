import { MailService } from '../service/mail.service';
jest.unmock('../service/mail.service');

describe('MailService', () => {
  describe('formatDate()', () => {
    it('should be "2019/01/01"', () => {
      const date = new Date(2019, 0, 1); // 2019/01/01
      expect(MailService.formatDate(date)).toBe('2019/01/01');
    });
  });
});
