import {Component, Input, OnInit, Output, TemplateRef, OnChanges} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordComponent } from '../modals/password/password.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [
    ToastrService

  ],
  entryComponents: [
    PasswordComponent
  ],
})

export class FullLayoutComponent implements OnInit, OnChanges {



  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  public modalRef: BsModalRef;

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }


  public changePassModal() {
    this.modalRef = this.modalService.show(PasswordComponent, {keyboard: false, ignoreBackdropClick: true, class: 'gray modal-md'});
    document.dispatchEvent(new CustomEvent('modal.password', {detail: this.modalRef}));
  }

  constructor(private modalService: BsModalService, private fb: FormBuilder, private toastr: ToastrService) {

  }


  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnChanges(): void {}
  ngOnInit(): void {}
}
