import { Component, Input } from '@angular/core';
import { Owner } from '../../models/owner.model';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css'
})
export class AboutmeComponent {
  @Input() owner!: Owner; 
}
