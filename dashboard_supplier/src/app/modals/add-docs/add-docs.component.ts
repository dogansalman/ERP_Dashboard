import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChild} from '@angular/core';
import { ApiServices } from '../../services/api.services';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { tr } from '../../shared/configs/tr';

@Component({
  templateUrl: 'add-docs.component.html'
})

export class AddDocsComponent  implements OnInit, AfterViewInit {




  public docsForms: FormGroup;
  public modal: BsModalRef;
  bsConfig: Partial<BsDatepickerConfig>;
  public formData: FormData = new FormData();
  public requisition_id = null;


  constructor( private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private fb: FormBuilder ) {
    this.requisition_id = location.pathname.split('/').slice(-1)[0];

    document.addEventListener('modal.adddocs', function (e) {
      document.addEventListener('close.adddocs', function (e2) {
        const closeEvt = <CustomEvent>e;
        closeEvt.detail.hide();
      });
    });


  this.docsForms = this.fb.group({
    'note': [null],
    'date': [null, Validators.required],
    'filename': [null, Validators.required]
  });
 }
  onSubmit(): void {
    console.log(  this.requisition_id);
     this.api.upload('supplier/requisitions/docs/' + this.requisition_id, this.formData).subscribe(() => {
        setTimeout(() => this.toastr.success('Dosya yüklendi.'));
        document.dispatchEvent(new CustomEvent('close.adddocs',  {}));
        this.docsForms.reset();
     });
  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    defineLocale('tr', tr);
    this.bsConfig = Object.assign({}, { locale: 'tr', containerClass: 'theme-blue zindex-inmodal'});
  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.formData.append('uploadFile', file, file.name);

      const dates = this.docsForms.value.date;
      const date = new Date(dates.getMonth() + 1 + '.' + dates.getDate() + '.' + dates.getFullYear());
      this.formData.append('date',  date.toLocaleDateString('tr-TR'));
      this.formData.append('note', this.docsForms.value.note);
      this.formData.append('filename', this.docsForms.value.filename);
    }
  }
  close(): void {
    document.dispatchEvent(new CustomEvent('close.adddocs',  {}));
  }


}
