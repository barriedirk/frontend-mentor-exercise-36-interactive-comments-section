import { TimeAgoPipe } from './time-ago-pipe';
import { subDays, subHours } from 'date-fns';

describe('TimeAgoPipe (Karma)', () => {
  let pipe: TimeAgoPipe;

  beforeEach(() => {
    pipe = new TimeAgoPipe();
  });

  it('should format a date 3 days ago', () => {
    const date = subDays(new Date(), 3).toISOString();
    const result = pipe.transform(date);

    expect(result).toContain('3 days ago');
  });

  it('should format a date 5 hours ago', () => {
    const date = subHours(new Date(), 5).toISOString();
    const result = pipe.transform(date);

    expect(result).toContain('5 hours ago');
  });

  it('should return empty string for invalid date', () => {
    const result = pipe.transform('not-a-date');

    expect(result).toBe('');
  });

  it('should return empty string for null input', () => {
    const result = pipe.transform(null as any);

    expect(result).toBe('');
  });
});
