import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { AddDocsComponent } from '../modals/add-docs/add-docs.component';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiServices } from '../services/api.services';

@Component({
  templateUrl: './docs.component.html'
})
export class DocsComponent implements OnInit {

  public id: any = 0;
  public title: any = '';
  public stockcard_id: any = null;
  public modalRef: BsModalRef;
  public documents = null;
  public documents_static = null;


  @Output() name: EventEmitter<string> = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private modalService: BsModalService, private api: ApiServices) {
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

  ngOnInit(): void {
    this.api.get('supplier/requisitions/docs/' + this.stockcard_id).subscribe(data => {this.documents = data; this.documents_static = data;});
  }
  getFiles(file: any): void {
    this.api.get('supplier/requisitions/files/' + this.stockcard_id + '/' + file.folder).subscribe(data => this.documents = data);
  }
  Download(item): void {
    window.open( 'http://api.abkar.com.tr/documents/' + this.stockcard_id + '/' + item.mainFolder + '/' + item.filename);
  }
}
