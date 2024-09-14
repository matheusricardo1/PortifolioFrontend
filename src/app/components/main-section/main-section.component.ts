import { Component, Input } from '@angular/core';
import { Owner } from '../../models/owner.model';

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css'
})
export class MainSectionComponent {
  @Input() owner!: Owner; 
}
