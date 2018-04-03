import {Directive, OnInit, HostListener, ElementRef,  Input} from '@angular/core';


@Directive({
  selector: '[appPrint]'
})

export class PrintDirective implements OnInit {
  @Input() printTo: HTMLElement;
  @Input() printEl: string;


  constructor(private el: ElementRef) {
  }

  @HostListener('click', ['$event'])
  click(event: any) {
  const content = this.printTo.outerHTML;

  const header = document.head.outerHTML;

    const sheets = document.styleSheets;
    const array = [];
    for (let c = 0; c < sheets.length; c++) {
      array.push(sheets[c].href);
    }
    let  popupWin;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
        ${header}
        <body onload="window.print();window.close()"> ${content}</body>
        </html>`
    );
    popupWin.document.close();
  }
  ngOnInit() {}
}
