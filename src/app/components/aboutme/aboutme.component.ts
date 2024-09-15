import { Component, Input } from '@angular/core';
import { Owner } from '../../models/owner.model';
import { ServerImagePipe } from '../../pipes/server-image.pipe';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [ServerImagePipe],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css'
})
export class AboutmeComponent {
  @Input() owner!: Owner; 
}
