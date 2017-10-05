import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl} from '@angular/forms';
import{ DatePipe} from '@angular/common';

@Component({
  templateUrl: 'machine.component.html'
})

export class MachineComponent implements OnInit {
  public id: number;
  public machine: any;
  public machineForm = new FormGroup({
    name: new FormControl(),
    created_date: new FormControl(),
    updated_date: new FormControl(),
  })
  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.machine = this.api.get('machines/' + this.id).subscribe(p => this.machineForm.patchValue(p));
      }
    })
  }
  onSubmit(): void {
    if (this.id) {
      this.api.put('machines/' + this.id, this.machineForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Makine kaydı güncellendi.'));
        setTimeout(() => this.routes.navigateByUrl('machines/list'), 1000);
      });
    } else {
      delete this.machineForm.value['created_date']
      this.api.post('machines', this.machineForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Makine kaydı oluşturuldu.'));
        setTimeout(() => this.routes.navigateByUrl('machines/list'), 1000);
      });
    }
  }
  onDelete(): void {
    this.api.delete('machines/' + this.id)
      .subscribe(r => {
        setTimeout(() => this.toastr.success('Makine kaydı silindi.'));
        setTimeout(() => this.routes.navigateByUrl('machines/list'), 2000);
      })
  }
}
