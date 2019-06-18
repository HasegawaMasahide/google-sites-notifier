import { Type } from '../model/type';
jest.unmock('../model/type');

describe('Type', () => {
  describe('toString()', () => {
    test('Create', () => {
      const label = Type.toString(Type.Create);
      expect(label).toBe('作成');
    });
    test('Update', () => {
      const label = Type.toString(Type.Update);
      expect(label).toBe('更新');
    });
  });

  describe('toType()', () => {
    test('作成', () => {
      const type = Type.toType('作成');
      expect(type).toBe(Type.Create);
    });
    test('更新', () => {
      const type = Type.toType('更新');
      expect(type).toBe(Type.Update);
    });
  });
});
