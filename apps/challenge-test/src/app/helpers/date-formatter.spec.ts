import { formatDate } from './date-formatter';

describe('formatDate', () => {
  it('should format a date with time correctly', () => {
    const input = '2023-07-04T15:30:00Z';
    const result = formatDate(input);
    // Result might vary depending on timezone, so check for partial match
    expect(result).toMatch(/4 de julio de 2023/);
  });

  it('should return "Fecha inválida" for an invalid date string', () => {
    const input = 'not-a-date';
    const result = formatDate(input);
    expect(result).toBe('Fecha inválida');
  });

  it('should return "Fecha inválida" for an empty string', () => {
    const input = '';
    const result = formatDate(input);
    expect(result).toBe('Fecha inválida');
  });

  it('should return "Fecha inválida" for a date with invalid month', () => {
    const input = '2023-13-01';
    const result = formatDate(input);
    expect(result).toBe('Fecha inválida');
  });
});
