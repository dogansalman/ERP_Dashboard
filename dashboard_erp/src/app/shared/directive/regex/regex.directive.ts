import {Directive, OnInit, HostListener, ElementRef, Renderer2, Input} from '@angular/core';
import {Http} from '@angular/http';

@Directive({
  selector: '[appRegex]'
})

export class RegexDirective implements OnInit {
  @Input() regex: string;
  public inputValue = '';
  public inputNewValue = '';

  constructor(private el: ElementRef) {
  }

  @HostListener('keypress', ['$event'])
  keypress(event: any) {
    this.inputNewValue = event.key;
  }

  @HostListener('input', ['$event'])
  input(event: any) {
    const re = new RegExp(this.regex);
    if (this.el.nativeElement.value.length > 0 &&  re.test(this.el.nativeElement.value) === false) {
      this.el.nativeElement.value = this.inputValue;
    } else {
      this.inputValue = this.el.nativeElement.value;
    }
  }

  ngOnInit() {

  }
}
