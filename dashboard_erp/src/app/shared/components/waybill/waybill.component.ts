import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import { OperationsComponent } from '../../../operations/operations.component';

@Component({
  //templateUrl: 'waybill.component.html'
  template: `
    <div [innerHtml]="myTemplate">
    </div>
    `
})


export class WaybillComponent implements OnInit {
  public waybillTemplate: any = '';
  public waybill = {};

  constructor(private http: Http) {
    this.http.get('/assets/data/waybill.template.html').subscribe((html: any) => {
      this.waybillTemplate = html._body;
    });
  }

  ngOnInit(): void {

  }


  print(data: any): void {
   console.log(data);
    let renderedTemplate = this.waybillTemplate;
    // edit date
    renderedTemplate = renderedTemplate.replace('%created_month%', ('0' + (new Date(data.edit_date).getMonth() + 1)).slice(-2));
    renderedTemplate = renderedTemplate.replace('%created_day%', ('0' + new Date(data.edit_date).getDate()).slice(-2));
    renderedTemplate = renderedTemplate.replace('%created_year%', new Date(data.edit_date).getFullYear().toString().substring(2, 4));
    // send date
    renderedTemplate = renderedTemplate.replace('%send_month%', ('0' + (new Date(data.send_date).getMonth() + 1)).slice(-2));
    renderedTemplate = renderedTemplate.replace('%send_day%', ('0' + new Date(data.send_date).getDate()).slice(-2));
    renderedTemplate = renderedTemplate.replace('%send_year%', new Date(data.send_date).getFullYear().toString().substring(2, 4));
    // invoice date
    renderedTemplate = renderedTemplate.replace('%invoice_month%', ('0' + (new Date(data.invoice_date).getMonth() + 1)).slice(-2));
    renderedTemplate = renderedTemplate.replace('%invoice_day%', ('0' + new Date(data.invoice_date).getDate()).slice(-2));
    renderedTemplate = renderedTemplate.replace('%invoice_year%', new Date(data.invoice_date).getFullYear().toString().substring(2, 4));

    // customer
    renderedTemplate = renderedTemplate.replace('%tax_name%', data.tax_name);
    renderedTemplate = renderedTemplate.replace('%tax_number%', data.tax_number);
    renderedTemplate = renderedTemplate.replace('%customer%', data.company);

    //
    this.waybill = data;
    let  popupWin;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
        <body onload="window.print();window.close()"> ${renderedTemplate}</body>
        </html>`
    );
    popupWin.document.close();
  }
}
