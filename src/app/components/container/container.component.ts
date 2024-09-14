import { NgClass } from '@angular/common';
import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Container } from '../../models/container.models';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [NgClass],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  @ContentChildren('child') children!: QueryList<any>;
  @Input() child!: Container<any>;
  @Input() collums?: number;
  
  ngAfterContentInit() {
    if(this.collums === undefined){
      this.collums = this.children.length
    }
    console.log("Child: ", this.child);
    console.log("Child: ", this.child.children);
    console.log(`Número de filhos: ${this.children.length}`);
  }

}
