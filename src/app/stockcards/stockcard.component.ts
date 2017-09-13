import {Component, OnInit, OnDestroy} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  templateUrl: 'stockcard.component.html'
})

export class StockcardComponent implements OnInit, OnDestroy {
  public id: number;
  public stockCard: any;
  public stockCardForm = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
    stock_type: new FormControl('Seçiniz'),
    unit: new FormControl(),
    state: new FormControl(),
    created_date: new FormControl(),
    updated_date: new FormControl()
  })
  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.stockCard = this.api.get('stockcards/' + this.id).subscribe(p => this.stockCardForm.patchValue(p));
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
