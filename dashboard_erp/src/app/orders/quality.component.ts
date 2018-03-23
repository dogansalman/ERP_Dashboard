import { Component, OnInit, } from '@angular/core';
import { ApiServices } from '../services/api.services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import {tr} from '../shared/configs/tr';
import {defineLocale} from 'ngx-bootstrap/bs-moment';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@Component({
  templateUrl: 'quality.component.html'
})

export class QualityComponent implements OnInit {

  public order_id: number;
  bsConfig: Partial<BsDatepickerConfig>;
  public qualityForm: FormGroup;

  constructor(private api: ApiServices, private toastr: ToastrService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    /*
     Order Form Build
      */
    this.qualityForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'date': [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.order_id = params['id'];
      }
    });

    defineLocale('tr', tr)
    /*
    datetime picker config
     */
    this.bsConfig = Object.assign({}, { locale: 'tr', containerClass: 'theme-blue zindex-inmodal'});

  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      this.api.upload('quality/files' + '/' + this.order_id, formData).subscribe(() => {
        setTimeout(() => this.toastr.success('Dosya yüklendi.'));
      });
    }
  }
}
