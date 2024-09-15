import { Component, Input } from '@angular/core';
import { Service } from '../../models/services.model';
import { ServerImagePipe } from '../../pipes/server-image.pipe';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [ServerImagePipe],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css'
})
export class MyServicesComponent {
  @Input() service!: Service;
}
