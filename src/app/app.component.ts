import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AboutmeComponent, ContactMeComponent, ContainerComponent, FooterComponent, HeaderComponent, MainSectionComponent, MyServicesComponent, ProjectComponent } from "./components/components";
import { Container } from './models/container.models';
import { Service } from './models/services.model';
import { Project } from './models/project.model';
import { OwnerService } from './services/owner.service';
import { Owner } from './models/owner.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HeaderComponent, MainSectionComponent, AboutmeComponent, ProjectComponent, ContainerComponent, MyServicesComponent, ContactMeComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  owner!: Owner; 

  constructor(private ownerService: OwnerService) {}

  ngOnInit(): void {
    this.ownerService.get().subscribe({
      next: (data: Owner) => { 
        this.owner = data;
        console.log(data)
      },
      error: (error) => {
        console.error('Erro ao carregar os dados do proprietário', error);
      },
    });
  }

  title = 'frontend';
  
  service: Container<Service> = {
    title: "O QUE EU FAÇO?",
    subtitle: "Minhas Especialidade",
    collums: 2,
    children: [
      {
        id: 1,
        image: '',
        name: 'Back-end Development',
        description: 'Lom ipsum dolo, sit amet consectetu adpisicing elit, rem voluptas sed blanditiis',
      },
      {
        id: 2,
        image: '',
        name: 'Front-end Development',
        description: 'Lom ipsum dolo, sit amet consectetu adpisicing elit, rem voluptas sed blanditiis',
      },
    ],
  }

  project: Container<Project> = {
    title: "PORTIFÓLIO",
    subtitle: "Últimos Projetos",
    children: [
      {
        id: 1,
        image: 'assets/images/projects/1.png',
        name: 'Need Food App Design',
        demo: 'oi!',
        github: 'oi!',
      },
      {
        id: 2,
        image: 'assets/images/projects/1.png',
        name: 'Need Food App Design2',
        demo: 'oi!',
        github: 'oi!',
      },
      {
        id: 3,
        image: 'assets/images/projects/1.png',
        name: 'Need Food App Design3',
        demo: 'oi!',
        github: 'oi!',
      },
    ]
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
        console.log(`Seção visível no centro: ${sectionId}`);
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
