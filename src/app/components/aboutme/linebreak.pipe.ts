import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreak',
  standalone: true
})
export class LinebreakPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }
}
