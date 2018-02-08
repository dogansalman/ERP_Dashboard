import {ModuleWithProviders, NgModule} from '@angular/core';
import { RoleDirective } from './role.directive';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [ CommonModule ],
  declarations: [ RoleDirective ],
  exports: [ RoleDirective]
})
export class RoleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RoleModule,
      providers: []
    }
  }
}
