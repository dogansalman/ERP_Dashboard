import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ConditionalValidate } from '../shared/validations/conditional-validate';

@Component({
  templateUrl: 'stockcard.component.html'
})

export class StockcardComponent implements OnInit {
  public id: number;
  public stockCard: any;
  public stockCardForm: FormGroup;
  public stockcardProcessNo: FormGroup;
  public photoUrl = '';
  /*
  File uploader
 */
  @ViewChild('uploader') uploader: ElementRef;

  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router, private formBuilder: FormBuilder) {
    this.stockCardForm = this.formBuilder.group({
        'code': [null, Validators.required],
        'name': [null, Validators.required],
        'stock_type': ['Seçiniz', [Validators.required, ConditionalValidate('Seçiniz')]],
        'unit': [0, Validators.required],
        'per_production_unit': [0, Validators.required],
        'created_date': [],
        'updated_date': [],
        'stockcard_process_no': this.formBuilder.array([])
    });

    this.stockcardProcessNo = this.formBuilder.group({
      process_no: [null, Validators.required],
      name: [null, Validators.required]
    })



  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.photoUrl =  this.api.host + '/files/' + this.id + '/photo/photo.jpg?r=' + Math.random();

        this.stockCard = this.api.get('stockcards/' + this.id).subscribe(p => {
          this.stockCardForm.patchValue(p);

          const process_numbers = <FormArray>this.stockCardForm.controls['stockcard_process_no'];
          process_numbers.controls.splice(0, process_numbers.controls.length);
          p.stockcard_process_no.forEach(pp => {
            const process = this.formBuilder.group({
              process_no: pp.process_no,
              name: pp.name
            });
            process_numbers.push(process);
          });
        });
      }
    })
  }
  addProcessNoControl() {
    const process_numbers = <FormArray>this.stockCardForm.controls['stockcard_process_no'];
    process_numbers.push(this.formBuilder.group({
      process_no: this.stockcardProcessNo.value.process_no,
      name: this.stockcardProcessNo.value.name
    }));
    this.stockcardProcessNo.reset();

  }
  initProcessNoControl(): any {
    return this.formBuilder.group({
      process_no: [null, Validators.required],
      name: [null, Validators.required]
    });
  }
  onDelStockCardProcNo(index: number): void {
    const stockcard_process_no_array = <FormArray>this.stockCardForm.controls['stockcard_process_no'];
    stockcard_process_no_array.removeAt(index);
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
  fileChange(event, id) {

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      this.api.upload('files/photo' + '/' + id, formData).subscribe(() => {
        setTimeout(() => this.toastr.success('Dosya yüklendi.'));
        this.photoUrl = this.api.host + '/files/' + this.id + '/photo/photo.jpg?r=' + Math.random();
      });
    }
  }
}
