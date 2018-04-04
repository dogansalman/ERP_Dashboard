import {Directive, Output, EventEmitter, OnInit, HostListener} from '@angular/core';
import {Http} from '@angular/http';

@Directive({
  selector: '[appCities]'
})

export class CitiesDirective implements OnInit {
  @Output('cities') cities: EventEmitter<object> = new EventEmitter<object>();

  constructor(public http: Http) {
  }

  @HostListener('change', ['$event'])
  change($event: any) {
    $event.preventDefault();
  }
  ngOnInit() {
    this.http.get('/assets/data/cities.json')
      .subscribe(city => this.cities.emit(city.json()));
  }
}
