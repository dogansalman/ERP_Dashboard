import {Component, OnInit, OnDestroy} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  templateUrl: 'personnel.component.html'
})

export class PersonnelComponent implements OnInit, OnDestroy {
  public id: number;
  public personel: any;
  public personnelForm = new FormGroup({
    username: new FormControl(),
    name: new FormControl(),
    lastname: new FormControl(),
    password: new FormControl(),
    department_id: new FormControl('Seçiniz'),
    state: new FormControl()
  })
  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.personel = this.api.get('personnel/' + this.id).subscribe(p => this.personnelForm.patchValue(p));
      }
    })
  }
  onSubmit(): void {
    if (this.id) {
      this.api.put('personnel/' + this.id, this.personnelForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Personel kaydı güncellendi.'));
        setTimeout(() => this.routes.navigateByUrl('personnel/list'), 1000);
      });
    } else {
      this.api.post('personnel', this.personnelForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Personel kaydı oluşturuldu.'));
        setTimeout(() => this.routes.navigateByUrl('personnel/list'), 1000);
      });
    }
  }
  onDelete(): void {
    this.api.delete('personnel/' + this.id)
      .subscribe(r => {
        setTimeout(() => this.toastr.success('Personel kaydı silindi.'));
        setTimeout(() => this.routes.navigateByUrl('personnel/list'), 2000);
      })
  }
  onCheckboxChange(event) {
    if (this.personnelForm.get(event.target.id)) {
      this.personnelForm.patchValue({state: event.target.checked ? true : false});
    }
  }
  ngOnDestroy(): void {
  }
}
