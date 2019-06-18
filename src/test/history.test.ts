import { History } from '../model/history';
import { Type } from '../model/type';
jest.unmock('../model/history');

describe('History', () => {
  describe('isEqual()', () => {
    const h1 = new History([
      new Date(2019, 1, 1).toString(),
      'author',
      'title',
      'url',
      Type.Create,
      false
    ]);
    const h2 = new History([
      new Date(2019, 1, 1).toString(),
      'author',
      'title',
      'url',
      Type.Create,
      false
    ]);
    const h3 = new History([
      new Date(2019, 1, 2).toString(),
      'author',
      'title',
      'url',
      Type.Create,
      false
    ]);
    const h4 = new History([
      new Date(2019, 1, 1).toString(),
      'author2',
      'title',
      'url',
      Type.Create,
      false
    ]);
    const h5 = new History([
      new Date(2019, 1, 1).toString(),
      'author',
      'title2',
      'url',
      Type.Create,
      false
    ]);

    it('should be true', () => {
      expect(h1.isEqual(h2)).toBe(true);
    });
    it('should be false', () => {
      expect(h1.isEqual(h3)).toBe(false);
      expect(h1.isEqual(h4)).toBe(false);
      expect(h1.isEqual(h5)).toBe(false);
    });
  });
});
