import { Component, Input } from '@angular/core';
import { Service } from '../../models/services.model';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css'
})
export class MyServicesComponent {
  @Input() service!: Service;
}
