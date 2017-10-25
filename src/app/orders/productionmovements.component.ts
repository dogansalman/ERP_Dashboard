import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {DatePipe} from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {ToastrService} from 'ngx-toastr';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import * as moment from 'moment';


@Component({
  templateUrl: 'productionmovements.component.html'
})

export class ProductionmovementsComponent implements OnInit {

  public productionList = [];

  constructor(private api: ApiServices, private modalService: BsModalService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private _sanitizer: DomSanitizer, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /*
    Get productions
     */
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.api.get('productions/' + params['id']).subscribe(p => this.productionList = p);
      }
    });
  }
}
