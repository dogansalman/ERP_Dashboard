import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRange]'
})

export class RangeDirective {
  @Input() range: string;
  public inputValue = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  input(event: any): any {

    const min = parseInt(this.range.split('-')[0]);
    const max = parseInt(this.range.split('-')[1]);
    const nativeValue = parseInt(this.el.nativeElement.value);

    if (this.el.nativeElement.value.length > 0 && nativeValue >= min && nativeValue <= max) {
      this.inputValue = this.el.nativeElement.value;
    } else {
      if (this.el.nativeElement.value.length === 0) this.el.nativeElement.value = '';
      else
      this.el.nativeElement.value = this.inputValue;
    }
  }
}
