import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { ConditionalValidate } from '../shared/validations/conditional-validate';
@Component({
  templateUrl: 'personnel.component.html'
})

export class PersonnelComponent implements OnInit {
  /*
  Personel id
   */
  public id: number;
  /*
  Personel detail
   */
  public personel: any;
  /*
  Personel Form
   */
  public personnelForm: FormGroup;

  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router, private formBuilder: FormBuilder) {
    /*
    Personel form validation
     */
  this.personnelForm = formBuilder.group({
    'username': [null, Validators.required],
    'name': [null, Validators.required],
    'lastname': [null, Validators.required],
    'password': [null, Validators.required],
    'department_id': ['Seçiniz', [Validators.required, ConditionalValidate('Seçiniz') ]],
    'state': [false, Validators.required],
    'created_date': [],
    'updated_date': [],
  })
  }

  ngOnInit(): void {
    /*
    Get personel detail
     */
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.personel = this.api.get('personnel/' + this.id).subscribe(p => this.personnelForm.patchValue(p));
      }
    })
  }

  /*
    create or update personel
   */
  onSubmit(): void {
    if (this.id) {
      this.api.put('personnel/' + this.id, this.personnelForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Personel kaydı güncellendi.'));
        setTimeout(() => this.routes.navigateByUrl('personnel/list'), 1000);
      });
    } else {
      delete this.personnelForm.value['created_date']
      this.api.post('personnel', this.personnelForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Personel kaydı oluşturuldu.'));
        setTimeout(() => this.routes.navigateByUrl('personnel/list'), 1000);
      });
    }
  }
  /*
  Delete personel
   */
  onDelete(): void {
    this.api.delete('personnel/' + this.id)
      .subscribe(r => {
        setTimeout(() => this.toastr.success('Personel kaydı silindi.'));
        setTimeout(() => this.routes.navigateByUrl('personnel/list'), 2000);
      })
  }
  /*
  Status chechbox changed
   */
  onCheckboxChange(event) {
    if (this.personnelForm.get(event.target.id)) {
      this.personnelForm.patchValue({state: event.target.checked ? true : false});
    }
  }

}
