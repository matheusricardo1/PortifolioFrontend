import { Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';
import { ServerImagePipe } from '../../pipes/server-image.pipe';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ServerImagePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  @Input() project!: Project;

}
