import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  templateUrl: 'stockadd.component.html'
})


export class StockaddComponent {
  public modalRef: BsModalRef;
  public asd = `
 <div *myModal>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Modal title</h4>
          <button type="button" class="close" (click)="myModal.hide()" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>One fine body&hellip;</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" (click)="myModal.hide()">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
  `
  constructor(private modalService: BsModalService) {
  }

  public openModal() {
    console.log('modal opened');

     this.modalRef = this.modalService.show(this.asd);
    console.log(this.asd);
  }




}
