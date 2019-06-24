import { DateUtil } from '../date.util';

describe('DateUtil', () => {
  describe('formatDate()', () => {
    it('should be "2019/01/01"', () => {
      const date = new Date(2019, 0, 1); // 2019/01/01
      expect(DateUtil.formatDate(date)).toBe('2019/01/01');
    });
  });

  describe('formatDateTime()', () => {
    it('should be "2019/06/19 (水) 12:00"', () => {
      const date = new Date(2019, 5, 19, 12, 0); // 2019/06/19 12:00
      expect(DateUtil.formatDateTime(date)).toBe('2019/06/19 (水) 12:00');
    });
  });
});
