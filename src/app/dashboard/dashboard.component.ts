import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  // constructor( ) { }

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

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40, 55, 69, 500, 200, 158], label: 'Üretim'},
  ];

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

  }
}
