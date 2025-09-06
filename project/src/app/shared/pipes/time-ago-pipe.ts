import { Pipe, PipeTransform } from '@angular/core';

import { formatDistanceToNow, parseISO, isValid } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const date = typeof value === 'string' ? parseISO(value) : value;

    if (!isValid(date)) return '';

    return formatDistanceToNow(date, { addSuffix: true });
  }
}
