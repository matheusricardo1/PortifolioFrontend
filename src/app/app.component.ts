import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AboutmeComponent, ContactMeComponent, ContainerComponent, HeaderComponent, MainSectionComponent, MyServicesComponent, ProjectComponent } from "./components/components";
import { Container } from './models/container.models';
import { Service } from './models/services.model';
import { Project } from './models/project.model';
import { OwnerService } from './services/owner.service';
import { Owner } from './models/owner.model';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './services/project.service';
import { ServiceService } from './services/service.service';
import { catchError, forkJoin } from 'rxjs';
import { LoadingComponent } from "./components/loading/loading.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, HttpClientModule, HeaderComponent, MainSectionComponent, AboutmeComponent, ProjectComponent, ContainerComponent, MyServicesComponent, ContactMeComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  isLoading = true;
  isContentLoaded = false;
  fadeOutLoading = false;

  title = 'Portifólio - Matheus Ricardo Oliveira Lima';
  owner!: Owner; 
  project!: Project[];
  service!: Service[];

  serviceContainer: Container<Service> = {
    title: "O QUE EU FAÇO?",
    subtitle: "Meus Serviços",
    collums: 2,
    children: this.service,
  }

  projectContainer: Container<Project> = {
    title: "O QUE EU FAÇO?",
    subtitle: "Meus Projetos",
    children: this.project,
  }

  constructor(
    private ownerService: OwnerService,
    private projectService: ProjectService,
    private serviceService: ServiceService,
  ) {}

  ngOnInit(): void {
    forkJoin({
      owner: this.ownerService.getLastOwner().pipe(catchError(error => {
        console.error('Erro ao carregar os dados do proprietário', error);
        return [];
      })),
      projects: this.projectService.get().pipe(catchError(error => {
        console.error('Erro ao carregar os dados dos projetos', error);
        return [];
      })),
      services: this.serviceService.get().pipe(catchError(error => {
        console.error('Erro ao carregar os dados dos serviços', error);
        return [];
      }))
    }).subscribe({
      next: ({ owner, projects, services }) => {
        this.owner = owner;
        this.project = projects;
        this.service = services;
        console.log(owner, projects, services)
        this.fadeOutLoading = true; 

        this.waitForImagesToLoad().then(() => {
          this.fadeOutLoading = true; 
          setTimeout(() => {
            this.isLoading = false; 
            this.isContentLoaded = true; 
          }, 1000); 
        });
      },
      error: (error) => {
        console.error('Erro ao carregar os dados', error);
        this.isLoading = false; 
      }
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

  private waitForImagesToLoad(): Promise<void> {
    return new Promise((resolve) => {
      const images = Array.from(document.querySelectorAll('img'));
      const totalImages = images.length;
      let loadedImages = 0;

      if (totalImages === 0) {
        resolve();
        return;
      }

      images.forEach((img) => {
        if (img.complete) {
          loadedImages++;
          if (loadedImages === totalImages) {
            resolve();
          }
        } else {
          img.addEventListener('load', () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              resolve();
            }
          });
          img.addEventListener('error', () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              resolve();
            }
          });
        }
      });
    });
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
