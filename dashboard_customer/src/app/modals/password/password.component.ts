import {Component, Input, OnInit, Output} from '@angular/core';
import { ApiServices } from '../../services/api.services';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  templateUrl: 'password.component.html'
})

export class PasswordComponent  implements OnInit {



  public changePasswordForm: FormGroup;
  public modal: BsModalRef;

  constructor( private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private fb: FormBuilder ) {

    document.addEventListener('modal.password', function (e) {
      document.addEventListener('close.password', function (e2) {
        const closeEvt = <CustomEvent>e;
        closeEvt.detail.hide();
      });
    });

  this.changePasswordForm = this.fb.group({
    password: [null, Validators.required],
    newPassword: [null, Validators.required],
    reply: [null, Validators.required]
  });
 }
  onSubmit(): void {
      this.api.put('customer/company/password', this.changePasswordForm.value).subscribe(() => {
        this.toastr.success('Your password has been changed');
        this.close();
      })
  }

  ngOnInit(): void {


  }

  close(): void {
    document.dispatchEvent(new CustomEvent('close.password',  {}));
  }

}
