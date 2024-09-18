import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AboutmeComponent, ContactMeComponent, ContainerComponent, FooterComponent, HeaderComponent, MainSectionComponent, MyServicesComponent, ProjectComponent } from "./components/components";
import { Container } from './models/container.models';
import { Service } from './models/services.model';
import { Project } from './models/project.model';
import { OwnerService } from './services/owner.service';
import { Owner } from './models/owner.model';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './services/project.service';
import { ServiceService } from './services/service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HeaderComponent, MainSectionComponent, AboutmeComponent, ProjectComponent, ContainerComponent, MyServicesComponent, ContactMeComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Portifólio';
  owner!: Owner; 
  project!: Project[];
  service!: Service[];

  projectContainer: Container<Project> = {
    title: "O QUE EU FAÇO?",
    subtitle: "Minhas Especialidade",
    children: this.project,
  }

  serviceContainer: Container<Service> = {
    title: "O QUE EU FAÇO?",
    subtitle: "Minhas Especialidade",
    collums: 2,
    children: this.service,
  }

  constructor(
    private ownerService: OwnerService,
    private projectService: ProjectService,
    private serviceService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.ownerService.get().subscribe({
      next: (data: Owner) => { 
        this.owner = data;
      },
      error: (error) => {
        console.error('Erro ao carregar os dados do proprietário', error);
      },
    });

    this.projectService.get().subscribe({
      next: (data: Project[]) => { 
        this.project = data;
      },
      error: (error) => {
        console.error('Erro ao carregar os dados do proprietário', error);
      },
    });

    this.serviceService.get().subscribe({
      next: (data: Service[]) => { 
        this.service = data;
      },
      error: (error) => {
        console.error('Erro ao carregar os dados do proprietário', error);
      },
    });
  }

  @ViewChild('home', { read: ElementRef }) homeElement!: ElementRef;
  @ViewChild('about', { read: ElementRef }) aboutElement!: ElementRef;
  @ViewChild('services', { read: ElementRef }) servicesElement!: ElementRef;
  @ViewChild('projects', { read: ElementRef }) projectsElement!: ElementRef;
  @ViewChild('contact', { read: ElementRef }) contactElement!: ElementRef;
 
  sectionInView: string = '';
  private observer!: IntersectionObserver;
  
  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.9 
    };

    this.observer = new IntersectionObserver((entries) => {
      let closestElement: Element | null = null;
      let closestDistance = Infinity;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const viewportCenterY = window.innerHeight / 2;
          const elementCenterY = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenterY - elementCenterY);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestElement = entry.target;
          }
        }
      });

      if (closestElement) {
        const sectionId = (closestElement as HTMLElement).id;
        this.sectionInView = sectionId;
      }
    }, options);

    [this.homeElement, this.aboutElement, this.servicesElement, this.projectsElement, this.contactElement].forEach(element => {
      if (element) {
        this.observer.observe(element.nativeElement);
      }
    });
  }

  handleScrollHome() {
    this.homeElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  handleScrollAbout() {
    this.aboutElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  handleScrollServices() {
    this.servicesElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  handleScrollProjects() {
    this.projectsElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  handleScrollContact() {
    this.contactElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
