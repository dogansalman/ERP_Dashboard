import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: 'waybill.component.html'
})

export class WaybillComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  test(data: any): void {
    alert(data);
  }

}
