import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import { ApiServices } from '../services/api.services';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { ConditionalValidate } from '../shared/validations/conditional-validate';
import { Router } from '@angular/router'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { enGb } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { tr } from '../shared/configs/tr';
import { ExcelServices } from '../services/excel.services';
import * as FileSaver from 'file-saver';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  templateUrl: 'stockcards.component.html'
})

export class StockcardsComponent implements  OnInit {

  bsConfig: Partial<BsDatepickerConfig>;

  /*
  Stock card list
   */
  public stockCardList = [];

  /*
  Selected stock card files
   */
  public stockCardFiles = [];

  /*
  Selected stock card
   */
  public selectedStockCard = {};

  /*
  Ngx modal component
   */
  public modalRef: BsModalRef;
  public subscriptions: Subscription[] = [];

  /*
  Search term
   */
  public searchTerm: string;

  /*
  Search criteria
   */
  public searchCriteri = {name: 'Kodu', key: 'code'};

  /*
  Is add stock
   */
  public isAdd: boolean;

  /*
  Is email send
 */
  public isEmailSend: boolean;


  /*
  Stock change form/
   */
  public stockChangeForm: FormGroup;

  /*
  Stock request form
   */
  public stockRequestForm: FormGroup;

  /*
  Stock request message
 */
  public requestMessage: string;

  /*
  File uploader
 */
  @ViewChild('uploader') uploader: ElementRef;

  /*
  Stock change modal from group validation
   */

  constructor(private api: ApiServices, private modalService: BsModalService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private excelSer: ExcelServices) {



    /*
    Stock change form validations
     */
    this.stockChangeForm = formBuilder.group({
      'unit' : [null, Validators.required],
      'waybill': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'not': [null],
      'supplier': ['Seçiniz', [Validators.required, ConditionalValidate('Seçiniz')]]
    })

    /*
    Stock request form validation
     */
    this.stockRequestForm = formBuilder.group({
      'stockcard_id': [],
      'supplier': ['Seçiniz', [Validators.required, ConditionalValidate('Seçiniz')]],
      'unit': [0, Validators.required],
      'delivery_date': [Validators.required],
      'notify': [false]
    })
  }


  ngOnInit(): void {
    defineLocale('tr', tr)
    /*
    datetime picker config
     */
    this.bsConfig = Object.assign({}, { locale: 'tr', containerClass: 'theme-blue zindex-inmodal'});
      /*
    Get stock cards
     */
    this.api.get('stockcards').subscribe(s => this.stockCardList = s);

  }

  /*
  Set search criteria
   */
  setSearchCriteria(sc): void {
    this.searchCriteri = sc;
  }

  /*
  Open modal
   */
  public openModal(template: TemplateRef<any>, stockcard, add) {
    this.selectedStockCard = stockcard;
    this.isAdd = add;
    this.api.get('files/' + stockcard.id).subscribe(files => this.stockCardFiles = files);

    this.modalRef = this.modalService.show(template, {keyboard: false, ignoreBackdropClick: true});
    /*
    Modal closing
     */
    this.modalService.onHide.subscribe((reason: string) => {
      this.stockChangeForm.reset();
      this.stockRequestForm.reset();
    });
  }

  /*
  Change stocks
   */
  changeStock(id): void {
   if (!id) { return; }

    const stockMovemenet = Object.assign(this.stockChangeForm.value, {stockcard_id : id});
   if (this.isAdd) {
     this.api.post('stockmovements/add/' + id, stockMovemenet).subscribe( () => {
       const selectedStockCard =  this.stockCardList.find((sc) => sc.id === id);
       selectedStockCard.unit = selectedStockCard.per_production_unit > 0 ? (parseInt(stockMovemenet.unit) * parseInt(selectedStockCard.per_production_unit)) :  (selectedStockCard.unit + parseInt(stockMovemenet.unit));
       this.modalRef.hide();
       setTimeout(() => this.toastr.success(stockMovemenet.unit + ' adet stok eklendi.'));
     });
   } else {
     this.api.put('stockmovements/remove/' + id, stockMovemenet).subscribe( () => {
       const selectedStockCard =  this.stockCardList.find((sc) => sc.id === id);
       this.stockCardList.find((sc) => sc.id === id).unit -= selectedStockCard.per_production_unit > 0 ? (parseInt(stockMovemenet.unit) * parseInt(selectedStockCard.per_production_unit)) : stockMovemenet.unit;
       this.modalRef.hide();
       setTimeout(() => this.toastr.success(stockMovemenet.unit + ' adet stok çıkartıldı.'));
     });
   }
  }
  /*
  Stock request
   */
  addStockRequest(id): void {
     if (!id) { return; }

     const supplier = JSON.parse(this.stockRequestForm.value.supplier.replace(/(\r\n\t|\n|\r\t)/gm, '').trim());
     this.stockRequestForm.value.supplier = supplier.company;
     this.stockRequestForm.value.supplier_id = supplier.id;

    const stockRequest = Object.assign(this.stockRequestForm.value, { stockcard_id : id, message: this.stockRequestForm.value.notify ? this.requestMessage : null });

    const dates = this.stockRequestForm.value.delivery_date;
    this.stockRequestForm.value.delivery_date = (dates.getMonth() + 1) + '/' + dates.getDate() + '/' + dates.getFullYear();

     this.api.post('supply/request', stockRequest).subscribe(() => {
      this.modalRef.hide();
      setTimeout(() => this.toastr.success('Stok istek kaydı oluşturuldu.'));
    })
  }

  /*
  Navigate detail
   */
  navigateDetail(event, id): void {
    if (!event.target.closest('.btn')) {
      this.router.navigateByUrl('stockcards/edit/' + id);
    }
  }


  onCheckboxChange(event) {
    this.isEmailSend = event.target.checked ? true : false;
  }

  /*
  Save as excel
   */
  saveAsExcel(): void {
    this.excelSer.exportAsExcelFile(this.stockCardList , 'Stok_Kart_Listesi');
  }

  /*
  Get icon from extentions
   */
  Icons(filename): string {
    const extention = filename.split('.')[filename.split('.').length - 1].toLowerCase();
    const icons = {
      'jpg': 'fa fa-file-image-o',
      'png': 'fa fa-file-image-o',
      'gif': 'fa fa-file-image-o',
      'jpeg': 'fa fa-file-image-o',
      'rar': 'fa fa-file-archive-o',
      'zip': 'fa fa-file-archive-o',
      'doc': 'fa fa-file-word-o',
      'docx': 'fa fa-file-word-o',
      'rtf': 'fa fa-file-word-o',
      'pdf': 'fa fa-file-pdf-o',

    }

    return icons[extention];
  }

  fileChange(event, id) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      this.api.upload('files' + '/' + id, formData).subscribe(() => {
        setTimeout(() => this.toastr.success('Dosya yüklendi.'));
      });
      this.stockCardFiles.push({name: file.name, id: id});
    }
  }

  Download(name, id): void {
    window.open( 'http://localhost:8080/api/files/download/' + id + '/' + name.split('.')[0] + '/' + name.split('.').pop());
  }

}
