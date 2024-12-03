import { Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  @Input() project!: Project;

}
