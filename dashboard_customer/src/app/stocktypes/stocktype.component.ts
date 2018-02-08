import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import{ DatePipe} from '@angular/common';

@Component({
  templateUrl: 'stocktype.component.html'
})

export class StocktypeComponent implements OnInit {
  public id: number;
  public stockType: any;
  public stockTypeForm: FormGroup;

  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router, private formBuilder: FormBuilder) {
    this.stockTypeForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'created_date': [],
      'updated_date': [],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.stockType = this.api.get('stocktypes/' + this.id).subscribe(p => this.stockTypeForm.patchValue(p));
      }
    })
  }
  onSubmit(): void {
    if (this.id) {
      this.api.put('stocktypes/' + this.id, this.stockTypeForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Stok model kaydı güncellendi.'));
        setTimeout(() => this.routes.navigateByUrl('stocktypes/list'), 1000);
      });
    } else {
      delete this.stockTypeForm.value['created_date']
      this.api.post('stocktypes', this.stockTypeForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Stok model kaydı oluşturuldu.'));
        setTimeout(() => this.routes.navigateByUrl('stocktypes/list'), 1000);
      });
    }
  }
  onDelete(): void {
    this.api.delete('stocktypes/' + this.id)
      .subscribe(r => {
        setTimeout(() => this.toastr.success('Stok model kaydı silindi.'));
        setTimeout(() => this.routes.navigateByUrl('stocktypes/list'), 2000);
      })
  }
}
