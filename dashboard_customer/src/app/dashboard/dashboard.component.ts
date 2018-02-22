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

  //company
  public company: any;
  // Production Per Month
  public barChartData: any[] = [
    {data: [], label: 'Production'},
  ];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public status: { isopen } = { isopen: false };

  constructor( private api: ApiServices, private excelSer: ExcelServices, private http: Http ) {   }

  // dropdown buttons
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    // get company
    this.api.get('customers/detail').subscribe((c) => this.company = c);

    const da = [ {data: [], label: 'Production'}];
    da[0].data.push(1500);
    da[0].data.push(2255);
    da[0].data.push(3698);
    da[0].data.push(3200);
    da[0].data.push(4589);
    da[0].data.push(6956);
    da[0].data.push(5545);
    da[0].data.push(3698);
    da[0].data.push(2325);
    da[0].data.push(6598);
    da[0].data.push(8589);
    da[0].data.push(12365);
    this.barChartData = da;

    // production
    // this.onProductionReports((new Date()).getFullYear());
  }

  // get production repors
  onProductionReports(year): void {
    this.api.get('reports/production/' + year).subscribe(p => {
      const da = [ {data: [], label: 'Üretim'}];
      for (let i = 0; i < 12; i++) {
        const r = p.find( pp => pp.Month === (i + 1));
         da[0].data.push(r ? r.Unit : 0);
      }
      this.barChartData = da;
      });
  };
}
