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

  public barChartData: any[] = [
    {data: [], label: 'Üretim'},
  ];

  public stockcard: any[] = [];
  public process: any[] = [];
  public stocks: any[];

   constructor( private api: ApiServices, private excelSer: ExcelServices, private http: Http ) {
     this.http.get('/assets/data/stocks.json')
       .subscribe(c => this.stocks = c.json());
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
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
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

    // best production
    this.onBestProduction();
  }

  // get production repors
  onProductionReports(year): void {
    this.api.get('reports/production/' + year).subscribe(p => {
      const da = [ {data: [], label: 'Üretim'},];
      for (let i = 0; i < 12; i++) {
        const r = p.find( pp => pp.Month === (i + 1));
         da[0].data.push(r ? r.Unit : 0);
      }
      this.barChartData = da;
      });
  };

  // get critical stock cards
  onCriticalStockCards(unit): void {
    this.api.get('reports/stockcards/' + unit).subscribe(s => this.criticalStocks = s);
  }

  // get best production
  onBestProduction(): void {
    this.api.get('reports/production/best').subscribe(bp => {
      const lbl: string[] = []
      this.doughnutChartData.splice(0, 10);
      bp.forEach(item => {
        lbl.push(item.name);
        this.doughnutChartData.push(item.unit);
      });
       this.doughnutChartLabels = lbl;
    });
  }

  /* STOCK CARDS */
  excelle(): void {
    this.stocks.forEach(s => {
      this.addStockcard(s);
    });
    // find process numbers
    this.stockcard.forEach(sc => {
      this.stocks.filter(s => s.code === sc.code).forEach(scss => {
        this.process.push({code: sc.code, process_code: scss.process_code, name: scss.name})
      });
    });
    // console.log(this.stockcard);
     console.log(this.process);
    //this.excelSer.exportAsExcelFile(this.stockcard , 'stokcard');
    this.excelSer.exportAsExcelFile(this.process , 'process');

  }
  addStockcard(card): any {
    const getIndex = this.stockcard.findIndex(sc => sc.code === card.code);

    // if existence in real list delete from temp list
    if (getIndex > -1) {
    //  this.stocks.splice(getIndex, 1);
      return false;
    };

    // find stock card name using to process code
    const name = this.findName(card);
    this.stockcard.push({code: card.code, name: name });

  }
  findName(card): any {
    this.stocks.filter(sc => sc.code === card.code).forEach(sc => {
     const process_code =  sc.process_code.toString().slice(-2);
      if (process_code === '01') return sc.name;
    });
    const firstName = this.stocks.find(sc => sc.code === card.code).name;
    return  firstName ? firstName : 'İsim Bulunamadı.';
  }

}
