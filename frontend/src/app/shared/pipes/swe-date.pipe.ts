import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sweDate',
})
export class SweDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return '';
    }

    const formatter = new Intl.DateTimeFormat('sv-SE', {
      day: 'numeric',
      month: 'short',
    });

    return formatter.format(date).replace(/\.$/, '');
  }
}
