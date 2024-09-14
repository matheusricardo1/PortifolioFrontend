import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Owner } from '../../models/owner.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() owner!: Owner; 

  @Output() scrollHome = new EventEmitter<void>();
  @Output() scrollAbout = new EventEmitter<void>();
  @Output() scrollServices = new EventEmitter<void>();
  @Output() scrollProjects = new EventEmitter<void>();
  @Output() scrollContact = new EventEmitter<void>();

  currentSection: string = '';

  @Input() set sectionInView(sectionId: string) {
    this.currentSection = sectionId;
  }

  isSectionActive(sectionId: string): boolean {
    return this.currentSection === sectionId;
  }

  onScrollHome() {
    this.scrollHome.emit();
  }
  onScrollAbout() {
    this.scrollAbout.emit();
  }
  onScrollServices() {
    this.scrollServices.emit();
  }
  onScrollProjects() {
    this.scrollProjects.emit();
  }
  onScrollContact() {
    this.scrollContact.emit();
  }
}
