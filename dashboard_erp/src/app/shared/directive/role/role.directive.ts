import {Directive, OnInit, ElementRef, Renderer2, Input} from '@angular/core';

@Directive({
  selector: '[appRole]'
})

export class RoleDirective implements OnInit {
  @Input() appRole: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const roles = this.appRole.split(',');
    const role =  window.localStorage.getItem('role');
    if(!roles.find(x => x === role))  this.el.nativeElement.remove();

   // console.log(this.el.nativeElement);

  }

}
