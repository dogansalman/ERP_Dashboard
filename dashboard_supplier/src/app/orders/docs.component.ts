import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { AddDocsComponent } from '../modals/add-docs/add-docs.component';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './docs.component.html'
})
export class DocsComponent implements OnInit {

  public id: any = 0;
  public title: any = '';
  public stockcard_id: any = null;
  public modalRef: BsModalRef;

  @Output() name: EventEmitter<string> = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private modalService: BsModalService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.title = params['title'].replace(/-/g, ' ');
        this.stockcard_id = params['stockcard_id'];
      }
    });
  }


    public openModal() {
    this.modalRef = this.modalService.show(AddDocsComponent, {keyboard: false, ignoreBackdropClick: true, class: 'gray modal-md'});
    document.dispatchEvent(new CustomEvent('modal.adddocs', {detail: Object.assign(this.modalRef, {requisition_id: this.id})}));
    this.name.emit('chicken');
  }

  ngOnInit(): void {}
}
