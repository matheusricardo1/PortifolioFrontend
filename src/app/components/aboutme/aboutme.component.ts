import { Component, Input } from '@angular/core';
import { Owner } from '../../models/owner.model';
import { LinebreakPipe } from './linebreak.pipe'; // ajuste o caminho conforme sua pasta

@Component({
  selector: 'app-aboutme',
  standalone: true,
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css',
  imports: [LinebreakPipe] // <-- importa o pipe aqui
})
export class AboutmeComponent {
  @Input() owner!: Owner; 
}
