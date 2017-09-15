import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loader.services';
import { LoaderState } from './loader';

@Component({
  selector: 'app-loader',
  template: `<div [class.loader-hidden]="!show">
<div class="loader-overlay">
  <div>
    loading
  </div>
  </div>
  </div>`,
  styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;
  constructor(
    private loaderService: LoaderService
  ) { }
  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
