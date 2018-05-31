import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  templateUrl: 'live.component.html'
})

export class LiveComponent  implements OnInit {




  public modal: BsModalRef;

  constructor( ) {

    document.addEventListener('modal.chat', function (e) {
      document.addEventListener('close.chat', function (e2) {
        const closeEvt = <CustomEvent>e;
        closeEvt.detail.hide();
      });
    });


 }


  ngOnInit(): void {


  }

  close(): void {
    document.dispatchEvent(new CustomEvent('close.chat',  {}));
  }

}
