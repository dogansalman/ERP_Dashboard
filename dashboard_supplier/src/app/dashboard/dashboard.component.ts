import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServices } from '../services/api.services';
import { ExcelServices } from '../services/excel.services';
import { Http } from '@angular/http';
import {first} from "rxjs/operator/first";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  @ViewChild('chartEl') chartEl: ElementRef;

  // company
  public company: any;
  public stats: any;

  public status: { isopen } = { isopen: false };

  constructor( private api: ApiServices, private excelSer: ExcelServices, private http: Http ) {   }

  // dropdown buttons
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    this.api.get('supplier/company').subscribe((c) => this.company = c);
    this.api.get('supplier/requisitions/stats').subscribe((s) => this.stats = s);
  }

}
