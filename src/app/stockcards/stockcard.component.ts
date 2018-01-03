import {Component, OnInit, OnDestroy} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { ConditionalValidate } from '../shared/validations/conditional-validate';

@Component({
  templateUrl: 'stockcard.component.html'
})

export class StockcardComponent implements OnInit, OnDestroy {
  public id: number;
  public stockCard: any;
  public stockCardForm: FormGroup;

  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router, private formBuilder: FormBuilder) {
    this.stockCardForm = this.formBuilder.group({
        'code': [null, Validators.required],
        'name': [null, Validators.required],
        'stock_type': ['Seçiniz', [Validators.required, ConditionalValidate('Seçiniz')]],
        'unit': [0, Validators.required],
        'per_production_unit': [0, Validators.required],
        'created_date': [],
        'updated_date': [],
        'stockcard_process_no': this.formBuilder.array([
            this.formBuilder.group({
              process_no: ['', Validators.required]
            })
          ])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.stockCard = this.api.get('stockcards/' + this.id).subscribe(p => {
          this.stockCardForm.patchValue(p);
          const stockcard_process_no_array = <FormArray>this.stockCardForm.controls['stockcard_process_no'];
          stockcard_process_no_array.controls.splice(0, stockcard_process_no_array.controls.length);

          p.stockcard_process_no.forEach(spn => {
            stockcard_process_no_array.push(this.formBuilder.group({
              process_no: spn.process_no
            }))
          });

        });
      }
    })
  }
  onSubmit(): void {
    if (this.id) {
      this.api.put('stockcards/' + this.id, this.stockCardForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Stok Kartı kaydı güncellendi.'));
        setTimeout(() => this.routes.navigateByUrl('stockcards/list'), 1000);
      });
    } else {
      delete this.stockCardForm.value['created_date']
      this.api.post('stockcards', this.stockCardForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Stok Kartı kaydı oluşturuldu.'));
        setTimeout(() => this.routes.navigateByUrl('stockcards/list'), 1000);
      });
    }
  }
  onDelete(): void {
    this.api.delete('stockcards/' + this.id)
      .subscribe(r => {
        setTimeout(() => this.toastr.success('Stok Kartı kaydı silindi.'));
        setTimeout(() => this.routes.navigateByUrl('stockcards/list'), 2000);
      })
  }
  onCheckboxChange(event) {
    if (this.stockCardForm.get(event.target.id)) {
      this.stockCardForm.patchValue({state: event.target.checked ? true : false});
    }
  }
  ngOnDestroy(): void {
  }
}
