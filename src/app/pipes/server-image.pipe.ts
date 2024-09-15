import { Pipe, PipeTransform } from '@angular/core';
import { API_URL } from './../constants';

@Pipe({
  name: 'serverImg',
  standalone: true,
})
export class ServerImagePipe implements PipeTransform {

  transform(imagePath: string): string {
    console.log(`${API_URL}${imagePath}`);
    return `${API_URL}${imagePath}`;
  }

}
