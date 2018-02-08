import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import{ DatePipe} from '@angular/common';

@Component({
  templateUrl: 'operation.component.html'
})

export class OperationComponent implements OnInit {
  public id: number;
  public operation: any;
  public operationForm: FormGroup;

  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router, private formBuilder: FormBuilder) {
    this.operationForm = formBuilder.group({
      'name': [null, Validators.required],
      'operation_time': [null, Validators.required],
      'created_date': [],
      'updated_date': [],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.operation = this.api.get('operations/' + this.id).subscribe(p => this.operationForm.patchValue(p));
      }
    })
  }
  onSubmit(): void {
    if (this.id) {
      this.api.put('operations/' + this.id, this.operationForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Operasyon kaydı güncellendi.'));
        setTimeout(() => this.routes.navigateByUrl('operations/list'), 1000);
      });
    } else {
      delete this.operationForm.value['created_date']
      this.api.post('operations', this.operationForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Operasyon kaydı oluşturuldu.'));
        setTimeout(() => this.routes.navigateByUrl('operations/list'), 1000);
      });
    }
  }
  onDelete(): void {
    this.api.delete('operations/' + this.id)
      .subscribe(r => {
        setTimeout(() => this.toastr.success('Operasyon kaydı silindi.'));
        setTimeout(() => this.routes.navigateByUrl('operations/list'), 2000);
      })
  }
}
