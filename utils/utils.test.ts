import { cutTooLongText } from './utils';

test('Should cut long text.', () => {
  const longText = 'This is very long text!';
  expect(cutTooLongText(longText, 10)).toBe('This is ve...');
});
