import {Directive, Output, Input, EventEmitter, OnInit, HostListener} from '@angular/core';
import {Http} from '@angular/http';

@Directive({
  selector: '[appCities]'
})

export class CitiesDirective implements OnInit {
  public city = [];
  @Output('cities') cities: EventEmitter<object> = new EventEmitter<object>();

  constructor(public http: Http) {
  }

  @HostListener('change', ['$event'])
  change($event: any) {
    $event.preventDefault();

  }
  ngOnInit() {
    this.http.get('/assets/data/cities.json')
      .subscribe(city =>  {
        this.city = city.json();
        this.cities.emit(city.json())
      });
  }
}
