import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServices } from '../services/api.services';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  @ViewChild("chartEl") chartEl: ElementRef;

  public barChartData: any[] = [
    {data: [], label: 'Üretim'},
  ];


   constructor( private api: ApiServices ) { 
  
   }

  public reportsData;
  public criticalStocks;


  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  // dropdown buttons
  public status: { isopen } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  // Production Per Month
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  public barChartType = 'bar';
  public barChartLegend = true;


  // Doughnut
  public doughnutChartLabels: string[] = ['LS 589 KAPAK', 'Q5 İÇ KAPAK', 'AR589 KAPAK'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';


  // convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
  }

  ngOnInit(): void {
    // get reports
    this.api.get('reports').subscribe(r => this.reportsData = r);

    // critical stock cards
    this.onCriticalStockCards(50);
    
    // production
    this.onProductionReports((new Date()).getFullYear());
  }

  //get production repors
  onProductionReports(year): void {
    this.api.get('reports/production/'+ year).subscribe(p => {
      let da = [ {data: [], label: 'Üretim'},];
      for(let i = 0; i < 12; i++) {
        let r = p.find( pp => pp.Month == (i+1));
         da[0].data.push(r ? r.Unit : 0);
      }
      this.barChartData = da;
      });
  };
  // get critical stock cards
  onCriticalStockCards(unit): void {
    this.api.get('reports/stockcards/' + unit).subscribe(s => this.criticalStocks = s);
  }

}
