import {Directive, Output, Input, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Directive({
  selector: '[appTowns]'
})

export class TownsDirective implements OnInit, OnChanges {

  @Input('selectedCity') selectedCity: string;
  @Output('towns') towns: EventEmitter<object> = new EventEmitter<object>();
  private citylist ;
  constructor(public http: Http) {
    this.http.get('/assets/data/cities.json')
      .map((res: Response) =>  <any[]> res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(data => {this.citylist = data});
  }

  ngOnChanges(values) {
    //  Emitted Output Town
    if (this.citylist) {
      this.towns.emit(this.citylist.filter(t => t.il === values.selectedCity.currentValue)[0].ilceler);
    }
  }

  ngOnInit() {
  }

}
